const path = require('path');
const isDev = think.env === 'development';

module.exports = [
  {
    handle: 'meta',
    options: {
      logRequest: isDev,
      sendResponseTime: isDev
    }
  },
  {
    handle: 'resource',
    enable: isDev,
    options: {
      root: path.join(think.ROOT_PATH, 'www'),
      publicPath: /^\/(static|uploads|favicon\.ico|admin\.html|baidu_verify_EZapDUrmqP\.html|google7ee065ccad38da36\.html)/
    }
  },
  {
    handle: 'trace',
    enable: !think.isCli,
    options: {
      debug: isDev,
      templates: {
        404: path.join(think.ROOT_PATH, 'view/error_404.html'),
        500: path.join(think.ROOT_PATH, 'view/error_500.html')
      }
    }
  },
  {
    handle: 'payload',
    options: {
      uploadDir: path.join(think.ROOT_PATH, 'runtime/data')
    }
  },
  {
    handle: 'router',
    options: {
      suffix: ['.html']
    }
  },
  'logic',
  'controller'
];
