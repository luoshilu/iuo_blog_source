const BaseRest = require('../admin.js');

module.exports = class extends BaseRest {
  /**
     * 获取配置
     * @return {[type]} [description]
     */
  async getAction() {
    const list = await this.model('config').getList('site');
    return this.success(list);
  }
};
