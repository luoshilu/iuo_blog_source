const BaseRest = require('../admin.js');
const fs = require('fs');
const path = require('path');

// 生成一个demo html的目录
const demeFileDir = path.join(think.ROOT_PATH, 'www', 'static', 'home', 'demo_html');
if (!fs.existsSync(demeFileDir)) {
  fs.mkdirSync(demeFileDir);
}

module.exports = class extends BaseRest {
  /**
   * 添加demo
   * @return {[type]} [description]
   */
  async postAction() {
    const userInfo = this.userInfo;
    const createTime = this.post('create_time') ? (new Date(this.post('create_time'))).getTime() / 1000 : (new Date()).getTime() / 1000;
    const data = {
      user_id: userInfo.id,
      title: this.post('title'),
      slug: this.post('slug'),
      direct_url: this.post('direct_url'),
      status: this.post('status'),
      html: this.post('html'),
      css: this.post('css'),
      js: this.post('js'),
      content: this.post('content'),
      description: this.post('description'),
      markdown: this.post('markdown'),
      thumb: this.post('thumb'),
      view: 0,
      create_time: createTime,
      modify_time: createTime
    };

    // 唯一标识处理
    if (!data.slug) {
      data.slug = think.md5(new Date());
    }

    // 写入html文件
    await fs.writeFileSync(path.join(demeFileDir, data.slug) + '.html', data.content, (err) => {
      if (err) throw err;
    });

    const id = this.modelInstance.insert(data);

    if (id) {
      data.id = id;
      // await this.hook('demoCreate', data);
      return this.success({ id: id }, '添加成功');
    } else {
      return this.fail(1000, '添加失败');
    }
  }

  /**
   * 更新demo
   * @return {[type]} [description]
   */
  async putAction() {
    const id = this.id;
    if (!this.id) {
      return this.fail(1001, 'demo不存在');
    }
    const data = {
      title: this.post('title'),
      slug: this.post('slug'),
      direct_url: this.post('direct_url'),
      status: this.post('status'),
      html: this.post('html'),
      css: this.post('css'),
      js: this.post('js'),
      content: this.post('content'),
      description: this.post('description'),
      markdown: this.post('markdown'),
      thumb: this.post('thumb'),
      create_time: this.post('create_time') ? (new Date(this.post('create_time'))).getTime() / 1000 : (new Date()).getTime() / 1000,
      modify_time: (new Date()).getTime() / 1000
    };

    // 写入html文件
    await fs.writeFileSync(path.join(demeFileDir, data.slug) + '.html', data.content, (err) => {
      if (err) throw err;
    });

    const res = this.modelInstance.save(id, data);
    if (res) {
      data.id = id;
      await this.hook('demoUpdate', data);
      return this.success({ id: id }, '修改成功');
    } else {
      return this.fail(1000, '添加失败');
    }
  }

  /**
   * 获取demo
   * @return {[type]} [description]
   */
  async getAction() {
    let data;
    const map = {};
    // 获取详情
    if (this.id) {
      map.slug = this.id;
      if (think.isEmpty(this.userInfo)) {
        map.status = 99;
      }
      data = await this.modelInstance.where(map).find();
      return this.success(data);
    }
    // 页码
    const page = this.get('page') || 1;
    // 每页显示数量
    const pageSize = this.get('pageSize') || 5;
    data = await this.modelInstance.where(map).page(page, pageSize).order('create_time desc').fieldReverse('content').countSelect();
    return this.success(data);
  }

  /**
   * 删除demo
   * @return {[type]} [description]
   */
  async deleteAction() {
    if (!this.id) {
      return this.fail(1001, '文章不存在');
    }
    const rows = await this.modelInstance.where({ id: this.id }).delete();
    if (rows) {
      // 将其html删除
      const filePath = path.join(demeFileDir + '.html', this.slug);
      if (fs.existsSync(filePath)) {
        await fs.unlinkSync(path.join(demeFileDir + '.html', this.slug));
      }
      await this.hook('contentDelete', {id: this.id});
      return this.success({ affectedRows: rows }, '删除成功');
    } else {
      return this.fail(1000, '删除失败');
    }
  }
};