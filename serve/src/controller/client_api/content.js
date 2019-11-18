const Client = require('../client.js');

function addChild(commentList, findComment) {
  for (let i = 0; i < commentList.length; i++) {
    const id = commentList[i].id;
    if (findComment[id]) {
      commentList[i].child = addChild(findComment[id], findComment);
    } else {
      commentList[i].child = [];
    }
    const parent = commentList[i].parent;
    if (parent) {
      commentList[i].parent = {
        author: parent.author
      };
    }
  }
  return commentList;
}
module.exports = class extends Client {
  /**
   * 获取内容  通过 id 获取详情，通过type获取列表类型
   * @return {[type]} [description]
   */
  async getAction() {
    let data;
    // 获取详情
    if (this.id) {
      const map = {};
      map.slug = this.id;
      data = await this.modelInstance.where(map).find();
      // 增加阅读量
      if (!this.userInfo) {
        this.modelInstance.where(map).increment('view');
      }

      /**
       * 文章评论的数据格式化
       * @return [{comment}] [将评论垂直聚合，comments --> child --> comments --> child]
       * */
      const comments = data.comment;

      const findComment = {}; // 以父级评论id为key,子评论列表为value
      const topComment = []; // 顶级评论(无父级)
      comments.forEach(comment => {
        if (comment.parent_id === 0) {
          topComment.push(comment);
          return;
        }
        if (findComment[comment.parent_id]) {
          findComment[comment.parent_id].push(comment);
        } else {
          findComment[comment.parent_id] = [comment];
        }
      });

      data.comment = addChild(topComment, findComment);

      return this.success(data);
    }

    // 获取列表
    const type = this.get('type') || 'default'; // 列表类型
    const map = {
      status: 99,
      type: 'post'
    };
    // 归档
    if (type === 'archive') {
      data = await this.modelInstance.field('slug,title,create_time,category_id').where(map).order('create_time desc').select();
      const list = {};
      for (const i in data) {
        data[i].create_time *= 1000;
        const month = think.datetime(data[i].create_time, 'MM, YYYY');
        if (!list[month]) {
          list[month] = [];
        }
        list[month].push(data[i]);
      }
      return this.success(list);
    }
    // 热门文章
    if (type === 'hot') {
      data = await this.modelInstance.where(map).order('view desc').limit(10).field('title,slug,view').select();
      return this.success(data);
    }
    // 获取最近更新
    if (type === 'recent') {
      data = await this.modelInstance
        .cache('recent_content')
        .where(map)
        .limit(5).order('create_time desc')
        .fieldReverse('content,markdown')
        .select();
    }

    // 页码
    const page = this.get('page') || 1;
    // 每页显示数量
    const pageSize = this.get('pageSize') || 5;
    data = await this.modelInstance.where(map).page(page, pageSize).order('create_time desc').fieldReverse('content,markdown').countSelect();
    return this.success(data);
  }
};
