const Client = require('../client.js');

module.exports = class extends Client {
  /**
   * 文章集合，检索、分类、标签等
   * @return {[type]} [description]
   */
  async getAction() {
    const map = {
      status: 99,
      type: 'post'
    };

    let meta = {};
    let searchParam = this.get('search');

    if (searchParam) {
      searchParam = decodeURIComponent(searchParam);
      searchParam = searchParam.trim();
      // 不允许搜索空字符
      if (searchParam === '') {
        return this.display('error_404');
      }

      map['title|markdown'] = ['like', '%' + searchParam + '%'];
      meta = { key: 'search', value: searchParam };
    }
    if (this.get('category')) {
      const categoryId = await this.model('meta').where({ slug: this.get('category'), type: 'category' }).getField('id', true);
      meta = { key: 'category', value: this.get('category') };
      if (categoryId) {
        map['category_id'] = categoryId;
      }
    }

    if (this.get('tag')) {
      const tags = await this.model('meta').where({ slug: this.get('tag'), type: 'tag' }).getField('id');
      const contentIds = await this.model('relationship').where({ meta_id: ['IN', tags] }).getField('content_id');
      meta = { key: 'tag', value: this.get('tag') };
      if (contentIds) {
        map['id'] = ['IN', contentIds];
      }
    }

    const data = {};
    data.meta = meta;

    const page = this.get('page') || 1;
    const pageSize = this.get('pageSize') || 6;

    const contents = await this.model('content').where(map).page(page, pageSize).fieldReverse('markdown,description').order('create_time desc').countSelect();

    contents.data = contents.data.map((content) => {
      let matchContent = '';
      if (content.content) {
        // 去标签
        content.content = content.content.replace(/<[^>]+>/g, '');
        // 获取匹配
        if (searchParam) {
          content.content.replace(new RegExp(`(.{0,20})(${searchParam})(.{0,15})`, 'ig'), (match, $1, $2, $3) => {
            matchContent += ($1 + `<span class="match-val">${$2}</span>` + $3 + '<br>');
          });
        }
      }
      content.content = matchContent;
      return content;
    });

    data.contents = contents;
    return this.success(data);
  }
};
