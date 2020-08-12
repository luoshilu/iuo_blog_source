const BaseRest = require('../admin.js');

module.exports = class extends BaseRest {
  // token 生成
  async postAction() {
    const username = this.post('username');
    const password = this.post('password');
    const user = this.model('user');
    const userInfo = await user.where({ username: username }).find();
    if (think.isEmpty(userInfo)) {
      return this.fail('账户或密码错误！');// 用户不存在
    }
    const result = user.verifyPassword(userInfo, password);
    if (think.isEmpty(result)) {
      return this.fail('账户或密码错误！');
    }
    delete userInfo.password;
    delete userInfo.encrypt;
    user.where({ username: username }).update({last_login_time: (new Date()).getTime() / 1000});
    const token = await this.session('userInfo', userInfo);
    return this.success({ token: token });
  }

  async getAction() {
    this.ctx.status = 405;
    return this.fail('不允许的请求');
  }
};
