const fs = require('fs');
const path = require('path');
const minify = require('html-minifier').minify;

const runTimeViewPath = path.join(think.ROOT_PATH, 'runtime', 'view');
const viewPath = path.join(think.ROOT_PATH, 'view');

function deepCopyFile(dir, toDir, prefix) {
  if (!prefix) {
    prefix = '';
  }
  if (!fs.existsSync(toDir)) {
    fs.mkdirSync(toDir);
  }
  const views = fs.readdirSync(dir);
  views.forEach((val, index) => {
    const filePath = path.join(dir, val);

    fs.stat(filePath, (err, stats) => {
      if (err) return;

      // 检查文件类型
      if (stats.isFile()) {
        if (prefix && val.indexOf(prefix) > -1) {
          return;
        }
        const data = fs.readFileSync(path.join(dir, val), 'utf8');
        const minifyData = minify(data, {removeComments: true, collapseWhitespace: true, minifyJS: true, minifyCSS: true});
        fs.writeFileSync(path.join(toDir, prefix + val), minifyData);
      }
      if (stats.isDirectory()) {
        deepCopyFile(path.join(dir, val), path.join(toDir, val));
      }
    });
  });
}

think.beforeStartServer(async() => {
  if (think.env === 'production') {
    // 压缩模板
    deepCopyFile(viewPath, runTimeViewPath);
  }
});
