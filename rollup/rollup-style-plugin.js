/**
 * 供babel-plugin-import 使用
 */

import fs from 'fs-extra';
import path from 'path';

let cpName = '';

const writeStyle = (file, cpLess) => {
	// 打包后路径
	const fileEsPath = path.join(process.cwd(), 'es', file, 'style/less/index.less');
	fs.outputFileSync(fileEsPath, cpLess);

	/**
   * 拿到less写入es/style/less中
   * 按需加载 style:true
   * 通过js直接引入
   */
	const lessFile = path.join(process.cwd(), 'es', file, 'style/index.js');
	fs.outputFileSync(lessFile, `import './less/index.less';`);
  
	/**
   * 在css文件中写入js
   * 按需加载 style: 'css'
   * 通过js直接引入
   */
	const cssFile = path.join(process.cwd(), 'es', file, 'style/css/index.js');
	fs.outputFileSync(cssFile, `import './index.css';`);
};

export default (fileName) => {
	const styleFile = (dir) => {
		const directory = path.join(process.cwd(), 'src', dir);
		fs.readdirSync(directory, {
			encoding: 'utf-8'
		}).forEach(file => {
			// 源文件路径
			const filePath = path.join(directory, file);
			// 文件状态
			const fileStat = fs.statSync(filePath);

			let cpNameNum = true;

			if (fileStat.isDirectory()) {
				const subdir = path.join(dir, file);
				// cpName
				if (cpNameNum) {
					cpName = file;
				}

				styleFile(subdir);
			} else if (fileStat.isFile()) {
				cpNameNum = false;
				// 文件后缀
				const fileExtName = path.extname(filePath);

				if (fileExtName === '.less') {
					// 获取less内容
					const cpLess = fs.readFileSync(filePath, {
						encoding: 'utf-8'
					});
					writeStyle(cpName, cpLess);
				}
			}
		});
	};

	styleFile(fileName);
};