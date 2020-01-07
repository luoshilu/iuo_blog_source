const BaseRest = require('../client.js');

module.exports = class extends BaseRest {
  /**
   * 获取数据
   * @return {[type]} [description]
   */
  async getAction() {
    let data;
    const map = {};
    // 获取详情
    if (this.id) {
      map.id = this.id;
      if (think.isEmpty(this.userInfo)) {
        map.status = think.CONST.S_BS_PUBLISH.v;
      }
      data = await this.modelInstance.where(map).find();

      return this.success(data);
    }

    const type = this.get('type');

    if (type === 'recent') {
      // 最近回复
      const comment = await this.modelInstance
        .cache('recent_comment')
        .alias('comment')
        .join({
          table: 'content',
          join: 'left',
          as: 'content',
          on: ['content_id', 'id']
        })
        .join({
          table: 'meta',
          join: 'left',
          as: 'category',
          on: ['content.category_id', 'id']
        })
        .join({
          table: 'demo',
          join: 'left',
          as: 'demo',
          on: ['demo_id', 'id']
        })
        .where({ 'comment.status': think.CONST.S_BS_PUBLISH.v })
        .field('comment.*,content.slug,content.category_id,category.slug AS category,demo.slug AS demo_slug')
        .limit(5)
        .order('comment.create_time desc')
        .select();
      return this.success(comment);
    }
  }

  /**
   * 文章/页面 留言
   * @return {[type]} [description]
   */
  async postAction() {
    if (this.visitorInfo.comment_time - Date.now() < 12 * 1000) {
      return this.success({status: 0, msg: '你评论太频繁咯 ~'});
    }

    const slug = this.post('slug');

    const map = {
      slug: slug,
      status: think.CONST.S_BS_PUBLISH.v
    };

    const content = await this.model('content').where(map).find();

    if (think.isEmpty(content)) {
      return this.success({status: 0, msg: '文章不存在 ~'});
    }

    const parent = this.post('parent');
    const data = {
      content_id: content.id,
      author: this.post('author'),
      email: this.post('email'),
      url: this.post('url'),
      ip: this.ip,
      agent: this.header('User-Agent'),
      text: this.post('text'),
      status: think.CONST.S_BS_PUBLISH.v,
      parent_id: parent.id,
      parent: {id: parent.id, author: parent.author, text: parent.text},
      create_time: (new Date()).getTime() / 1000,
    };

    const insertId = await this.model('comment').add(data);

    let category = content.type;

    if (insertId) {
      this.visitorInfo.comment_time = Date.now();
      // 是文章类型，则获取其category
      if (content.type === 'post') {
        category = content.category.slug;
      }
      const commentLink = `content/${category}/${content.slug}#comment-${insertId}`;
      data.id = insertId;
      data.content = content;
      await this.hook('commentCreate', data, commentLink);
      delete data.content;
      return this.success(data);
    }
  }
};
