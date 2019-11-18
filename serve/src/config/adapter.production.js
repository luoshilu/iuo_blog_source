// 生产环境配置
const path = require('path');
const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_ROOT_PASSWORD,
  MYSQL_HOST,
  MYSQL_PORT
} = process.env

exports.model = {
  mysql: {
    database: 'blog',
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD || MYSQL_ROOT_PASSWORD
  }
};

exports.view = {
  common: {
    viewPath: path.join(think.ROOT_PATH, 'runtime/view')
  }
};
