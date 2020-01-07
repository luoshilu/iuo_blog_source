module.exports = {
  /** =========业务内容相关常量========= **/

  /*
  * S: 状态码
  * BS: 业务
  * ERR: 请求响应错误码
  */

  // 业务
  S_BS_DRAFT : {
    v: 0,
    en: 'draft',
    zh: '草稿'
  },
  S_BS_PUBLISH : {
    v: 99,
    en: 'publish',
    zh: '已发布'
  },
  S_BS_TOP : {
    v: 100,
    en: 'top',
    zh: '置顶'
  },

  // 响应码
  S_ERR_0 : {
    v: 0,
    msg: '成功'
  },
  S_ERR_400 : {
    v: 400,
    msg: '参数异常'
  },
  S_ERR_500 : {
    v: 500,
    msg: '服务器繁忙'
  },
}