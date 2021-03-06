const BaseRest = require('../admin.js');
module.exports = class extends BaseRest {
  /**
   * 添加内容
   * @return {[type]} [description]
   */
  async postAction() {
    const userInfo = this.userInfo;
    const createTime = this.post('create_time') ? (new Date(this.post('create_time'))).getTime() / 1000 : (new Date()).getTime() / 1000;
    const data = {
      user_id: userInfo.id,
      title: this.post('title'),
      encrypt: this.post('encrypt'),
      category_id: this.post('category_id'),
      slug: this.post('slug'),
      status: this.post('status'),
      markdown: this.post('markdown'),
      content: this.post('content'),
      tag: this.post('tag'),
      type: this.post('type'),
      thumb: this.post('thumb'),
      view: 0,
      create_time: createTime,
      modify_time: createTime
    };
    let res = await this.modelInstance.insert(data);
    if (res) {
      await this.hook('contentCreate', res);
      return this.success({ result: res }, '添加成功');
    } else {
      return this.fail(1000, '添加失败');
    }
  }

  /**
   * 更新内容
   * @return {[type]} [description]
   */
  async putAction() {
    const id = this.id;
    if (!this.id) {
      return this.fail(1001, '文章不存在');
    }
    const data = {
      title: this.post('title'),
      encrypt: this.post('encrypt'),
      category_id: this.post('category_id'),
      slug: this.post('slug'),
      status: this.post('status'),
      markdown: this.post('markdown'),
      content: this.post('content'),
      tag: this.post('tag'),
      type: this.post('type'),
      thumb: this.post('thumb'),
      create_time: this.post('create_time') ? (new Date(this.post('create_time'))).getTime() / 1000 : (new Date()).getTime() / 1000,
      modify_time: (new Date()).getTime() / 1000
    };
    let res = await this.modelInstance.save(id, data);
    if (res) {
      await this.hook('contentUpdate', res);
      return this.success({ result: res }, '修改成功');
    } else {
      return this.fail(1000, '添加失败');
    }
  }

  /**
   * 获取内容
   * @return {[type]} [description]
   */
  async getAction() {
    let data;
    const map = {};
    // 获取详情
    if (this.id) {
      map.slug = this.id;
      data = await this.modelInstance.where(map).find();
      return this.success(data);
    }

    // 关键词
    const key = this.get('key');
    if (key) {
      map['title|description'] = ['like', '%' + key + '%'];
    }

    // 内容类型
    const contentType = this.get('contentType') || 'post';
    map['type'] = contentType;
    // 页码
    const page = this.get('page') || 1;
    // 每页显示数量
    const pageSize = this.get('pageSize') || 5;
    data = await this.modelInstance.where(map).page(page, pageSize).order('create_time desc').fieldReverse('content,markdown').countSelect();
    return this.success(data);
  }

  /**
   * 删除内容
   * @return {[type]} [description]
   */
  async deleteAction() {
    if (!this.id) {
      return this.fail(1001, '文章不存在');
    }
    const rows = await this.modelInstance.where({ id: this.id }).delete();
    if (rows) {
      await this.hook('contentDelete', {id: this.id});
      return this.success({ affectedRows: rows }, '删除成功');
    } else {
      return this.fail(1000, '删除失败');
    }
  }
};
