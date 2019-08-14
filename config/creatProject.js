const chalk = require('chalk');
const glob = require('glob');
const path = require('path');
const fs = require('fs-extra');

process.stdin.setEncoding('utf8');
process.stdout.write('创建文件名(首字母为大写): ');

const creat = (srcDir, destDir, chunk) => {
	glob.sync('**', {
		cwd: srcDir,
		dot: true,
		ignore: [],
	}).forEach(file => {
		const fromPath = path.join(srcDir, file);
		const destPath = path.join(destDir, file);

		if (fs.existsSync(destPath)) {
			console.log(`${chalk.yellow('[警告]')}${'文件夹已存在'}`);
			process.exit(0);
		}

		if (fs.statSync(fromPath).isDirectory()) {
			fs.mkdirsSync(destPath);
		} else if (fs.statSync(fromPath).isFile()) {
			let content = fs.readFileSync(fromPath).toString();

			const reg = new RegExp(`<%=\\s*?name\\s*?%>`, 'gi');
			if (reg.test(content)) {
				content = content.replace(reg, chunk);
			}

			fs.writeFileSync(destPath, content);
		}

		if (fs.statSync(destPath).isFile()) {
			const baseName = path.basename(destPath, '.tsx');
			const testName = path.basename(destPath, '.test.js');
			const lessName = path.basename(destPath, '.less');
			if (baseName === 'name') {
				fs.renameSync(destPath, `${destDir}/${chunk}.tsx`);
			}
			if (testName === 'name') {
				fs.renameSync(destPath, `${destDir}/__test__/${chunk}.test.js`);
			}
			if (lessName === 'name') {
				fs.renameSync(destPath, `${destDir}/${chunk}.less`);
			}
		}

	});

	console.log(`${chalk.green('[成功]')}${'构建完成'}`);
	process.exit(0);
};

process.stdin.on('data', (chunk) => {

	console.log(`${chalk.grey('正在创建，请稍后...')}`);

	const newChunk = chunk.replace(/[\r\n]/, '');

	const srcDir = path.join(process.cwd(), 'temp', 'creatProject');

	const destDir = path.join(process.cwd(), 'src/web', newChunk);

	creat(srcDir, destDir, newChunk);

});