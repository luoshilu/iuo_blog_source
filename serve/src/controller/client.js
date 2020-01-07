const assert = require('assert');
module.exports = class extends think.Controller {
  constructor(ctx) {
    super(ctx);

    this.url = ctx.request.header.referer;
    this.agent = ctx.request.header['user-agent'];
    this.resource = this.getResource();
    this.id = this.getId();
    assert(think.isFunction(this.model), 'this.model must be a function');
    this.modelInstance = this.model(this.resource);
  }

  async __before(action) {
    this.header('Access-Control-Allow-Origin', '*');

    this.visitorInfo = await this.session('visitorInfo').catch(() => ({}));
    const isVisited = !think.isEmpty(this.visitorInfo);
    // 站点配置
    const config = await think.model('config').cache('config').getList();
    this.config.site = config.site;
    this.config.contact = config.contact;
    // 更新访客信息
    if (!isVisited) {
      let ipPrv = this.ip.slice(0,3)
      if (think.env === 'development' || ipPrv==='172' || ipPrv === '127') return;
      const visitorInfo = {
        ip: this.ip,
        url: this.url,
        agent: this.agent,
        visit_time: Date.now()
      };
      // 存储访客信息
      this.saveVisitor(visitorInfo);
      // 加入session
      const token = await this.session('visitorInfo', visitorInfo);
      this.token = token;
      this.visitorInfo = visitorInfo;
    }
  }

  getResource() {
    return this.ctx.controller.split('/').slice(-1)[0];
  }

  getId() {
    const id = this.get('id');
    if (id && (think.isString(id) || think.isNumber(id))) {
      return id;
    }
    const last = this.ctx.path.split('/').slice(-1)[0];
    if (last !== this.resource) {
      return last;
    }
    return '';
  }

  async getAction() {
    let data;
    const pk = this.modelInstance.pk;
    if (this.id) {
      data = await this.modelInstance.where({ [pk]: this.id }).find();
      return this.success(data);
    }
    data = await this.modelInstance.order(pk + ' desc').select();
    return this.success(data);
  }

  async postAction() {
    const pk = this.modelInstance.pk;
    const data = this.post();
    delete data[pk];
    if (think.isEmpty(data)) {
      return this.fail('data is empty');
    }
    const insertId = await this.modelInstance.add(data);
    if (insertId) {
      data[pk] = insertId;
      await this.hook(this.resource + 'Create', data);
    } else {
      return this.success({ id: insertId });
    }
  }

  /**
   * 存储访客信息
   */
  async saveVisitor(visitorInfo) {
    await this.model('visitor').save(visitorInfo);
  }

  __call() {

  }
};
