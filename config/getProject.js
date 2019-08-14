const fs = require('fs-extra');

const path = require('path');

const { setHtml, setIndex, webpackEntry, main } = require('../temp/app');

const tpl = require('art-template');

const indexHtml = require('../temp/index.art');

const milieu = process.env.NODE_ENV || 'development';

let cpName = ''; // component Name
let etName = ''; // webpack entry name
let webpackEntryArr = []; // webpackEntryArr
let mainArr = [];
let cpNameArr = [];


// 设置webpack所需entry
const setWebpackEntry = () => {
	const directory = path.join(process.cwd(), 'source');

	fs.readdirSync(directory, {
		encoding: 'utf-8'
	}).forEach(file => {
		// 文件路径
		const filePath = path.join(directory, file);
		const fileState = fs.statSync(filePath);

		if (fileState.isDirectory()) {
			etName = file;

			const obj = {
				name: etName,
				path: `${process.cwd()}/source/${etName}/index.js`
			};

			webpackEntryArr.push(obj);

			// 写入main
			mainArr.push({ name: etName });
		}
	});

	const etContent = webpackEntry(webpackEntryArr);
	const mainContent = main(mainArr);

	fs.outputFileSync(`${process.cwd()}/source/entry.js`, etContent);

	const mainFile = `${process.cwd()}/src/main.ts`;
	// 先删除一下，再创建
	fs.removeSync(mainFile);
	fs.outputFile(mainFile, mainContent, () => {
		fs.readFile(mainFile, 'utf8', (err, data) => {
			const newData = data.replace(/,/g, '');
			fs.writeFileSync(mainFile, newData);
		});
	});
};


const getEntryFile = (dir) => {
	const directory = path.join(process.cwd(), 'src', dir);

	fs.readdirSync(directory, {
		encoding: 'utf-8'
	}).forEach(file => {
		// 文件路径
		const filePath = path.join(directory, file);

		// 文件状态
		const fileStat = fs.statSync(filePath);

		if (fileStat.isDirectory() && file !== 'index') {
			const subdir = path.join(dir, file, 'examples');
			cpName = file;

			cpNameArr.push(cpName);

			getEntryFile(subdir);
		} else if (fileStat.isFile()) {
			// 文件后缀
			const fileExtName = path.extname(filePath);
			if (fileExtName === '.tsx') {
				if (/Basic/.test(filePath)) {
					// 生成html
					const cpHtml = setHtml(cpName);
					// 生成js
					const cpJs = setIndex(cpName, filePath);

					fs.outputFileSync(`${process.cwd()}/source/${cpName}/${cpName}.html`, cpHtml);
					fs.outputFileSync(`${process.cwd()}/source/${cpName}/index.js`, cpJs);
				}
			}
		}

		const cpList = [];

		cpNameArr.forEach(item => {
			cpList.push({
				name: item,
				file: milieu === 'production' ?
					`/mido-react-rc/dist/${item}/${item}.html` :
					`/${item}.html`
			});
		});

		const buildIndexHtml = indexHtml({ cpList });
		fs.outputFileSync(`${process.cwd()}/source/index.html`, buildIndexHtml);
	});
};

getEntryFile('web');
setWebpackEntry();
