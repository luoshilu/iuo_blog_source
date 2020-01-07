const BaseRest = require('../client');

module.exports = class extends BaseRest {
  // 查询访客信息
  async getAction() {
    const visitorInfo = this.visitorInfo || {};
    // 携带站内信息和站主信息
    let data = {
      visitorInfo,
      site: this.config.site,
      contact: this.config.contact
    }
    return this.success(data);
  }

  /**
   * 更新用户信息
   * @return {[type]} [description]
   */
  async putAction() {
    const userInfo = await this.modelInstance.where({ username: this.id }).find();
    const data = this.post();
    if (think.isEmpty(data)) {
      return this.fail(1000, '数据不能为空');
    }

    if (!think.isEmpty(data.password)) {
      if (data.newPassword !== data.confirmPassword) {
        return this.fail(1000, '两次密码不一致');
      }

      if (!this.modelInstance.verifyPassword(userInfo, data.password)) {
        return this.fail(1000, '旧密码不正确');
      }

      data.password = this.modelInstance.sign(userInfo, data.newPassword);
    }
    const rows = await this.modelInstance.where({ id: userInfo.id }).update(data);
    if (rows) {
      data.id = userInfo.id;
      await this.hook('userUpdate', data);
      return this.success({ affectedRows: rows }, '更新成功');
    } else {
      return this.fail(1000, '更新失败');
    }
  }
};
