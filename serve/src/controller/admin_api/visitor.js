const BaseRest = require('../admin.js');

module.exports = class extends BaseRest {
  /**
   * 获取访客列表
   * @return {[type]} [description]
   */
  async getAction() {
    // 每页显示数量
    const pageSize = this.get('pageSize') || 5;
    const page = this.get('page') || 1;
    const data = await this.modelInstance.where().page(page, pageSize).order('update_time desc').fieldReverse('id').countSelect();
    return this.success(data);
  }
};
