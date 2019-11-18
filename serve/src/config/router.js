module.exports = [
  // RESTFUL
  [/\/admin_api\/(\w+)(?:\/(.*))?/, 'admin_api/:1?id=:2', 'rest'], // 支持 rest 类型的请求
  [/\/client_api\/(\w+)(?:\/(.*))?/, 'client_api/:1?id=:2', 'rest'] // 支持 rest 类型的请求
];
