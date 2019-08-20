const { join } = require('path')
const { type } = require('os')
/**
 * 设置预览html
 */
exports.setHtml = (file) => {
  return `<!DOCTYPE html>
  <html lang="zh">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.bootcss.com/antd/3.20.7/antd.min.css" rel="stylesheet">
		<link rel="stylesheet" href="./${file}.css"></link>
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="https://cdn.bootcss.com/react/16.8.6/umd/react.production.min.js"></script>
    <script src="https://cdn.bootcss.com/react-dom/16.8.6/umd/react-dom.production.min.js"></script>
    <script src="https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js"></script>
    <script src="https://cdn.bootcss.com/antd/3.20.7/antd.min.js"></script>
    <script src="https://cdn.bootcss.com/xlsx/0.14.4/xlsx.full.min.js"></script>
    <script src="./${file}.js"></script>
  </body>
  </html>`;
};

/**
 * 设置预览js
 */
exports.setIndex = (name, file) => {
  return `import './${name}.html';
         import '${type() === 'Windows_NT' ?
          file.replace(/\\/g, '/\\') :
          file
        }';`;
};

/**
 * 设置entry
 */
exports.webpackEntry = (arr) => {
  let d;
  if (type() === 'Windows_NT') {
    d = arr.map(item => {
      const cpPath = item.path.replace(/\\/g, '/\\');
      return `'${[item.name]}': '${cpPath}'
      `;
    });
  } else {
    d = arr.map(item => {
      return `'${[item.name]}': '${item.path}'
      `;
    });
  }

  return `exports.entry = {
    index: '${type() === 'Windows_NT' ?
      join(process.cwd(), 'source', 'index.html').replace(/\\/g, '/\\') :
      join(process.cwd(), 'source', 'index.html')
    }',
    ${d}
  }`;
};

/**
 * 组件写入main
 */
exports.main = (arr) => {
  const d = arr.map(item => {
    return `
    export { default as ${item.name} } from './web/${item.name}';\n
    `;
  });
  return d;
};