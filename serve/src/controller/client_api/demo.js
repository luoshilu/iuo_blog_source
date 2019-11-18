const Client = require('../client.js');

// demo静态文件目录
const demoFileDir = '/static/home/demo_html/';
// view的demo目录
const viewDemo = '/demo/';

module.exports = class extends Client {
  /**
   * demo列表
   * @return {[type]} [description]
   */
  async getAction() {
    const map = {
      status: 1
    };

    /**
     * 详情
     */
    if(this.id) {
      map.slug = this.id;
      const demo = await this.model('demo').where(map).find();

      let res = {};
      res.demo = demo;
      res.demoFileSrc = demoFileDir + demo.slug + '.html'

      // 提交评论时的form action链接
      // this.assign('commentAction', 'demo/' + demo.slug + '/comment');
      // demo链接
      // this.assign('contentLink', 'demo/' + demo.slug + '.html');
      // 增加阅读量
      this.model('demo').where(map).increment('view');
  
      const replyTo = this.get('replyTo') || 0;

      res.replyTo = replyTo;
  
      return this.success(res);
    }

    /**
     * 列表
     */
    const data = await this.model('demo').field('slug,title,create_time,direct_url,description,thumb').where(map).order('create_time desc').select();

    let res = {};
    res.demoFileDir = demoFileDir;
    res.viewDemo = viewDemo;

    const list = {};
    for (const i in data) {
      data[i].create_time *= 1000;
      const month = think.datetime(data[i].create_time, 'MM, YYYY');
      if (!list[month]) {
        list[month] = [];
      }
      list[month].push(data[i]);
    }
    res.list = list;

    return this.success(res);
  }
};
