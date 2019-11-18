module.exports = class extends think.Model {
  // 模型关联
  get relation() {
    return {
      comment: {
        type: think.Model.HAS_MANY,
        key: 'id',
        fKey: 'demo_id',
        where: 'status=99',
        order: 'create_time desc'
      },
      user: {
        type: think.Model.BELONG_TO,
        model: 'user',
        key: 'user_id',
        fKey: 'id',
        field: 'id,username,email,qq,github,weibo,zhihu'
      }
    };
  }
  // 添加demo
  async insert(data) {
    data = this.parseContent(data);
    const id = await this.add(data);
    return id;
  }

  // 更新demo
  async save(id, data) {
    // 查询修改前数据

    // 更新数据
    data = this.parseContent(data);
    data.id = id;
    const res = await this.where({ id: data.id }).update(data);

    if (res) {
      // 更新demo数量
      this.updateCount(data.category_id, data.tag);
    }

    return res;
  }

  // 处理内容，生成demo简介
  parseContent(data) {
    return data;
  }

  // 更新demo数量
  async updateCount(categoryId, tagData) {
    // 更新分类数量
    const categoryCount = await this.where({ category_id: categoryId }).count();
    think.model('meta').where({ id: categoryId }).update({ count: categoryCount });
    // 更新标签数量
    for (var i in tagData) {
      const tagCount = await think.model('relationship').where({ meta_id: tagData[i] }).count();
      think.model('meta').where({ id: tagData[i] }).update({ count: tagCount });
    }
  }
};
