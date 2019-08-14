/**
 * rollup 配置
 */

import fs from 'fs-extra';
import path from 'path';


/**
 * rollup plugin
 */
import babel from 'rollup-plugin-babel';
import clear from 'rollup-plugin-clear';
import { eslint } from 'rollup-plugin-eslint';
import postcss from 'rollup-plugin-postcss';
import resolve from 'rollup-plugin-node-resolve';
import stylePlugin from './rollup-style-plugin';


import pkg from '../package.json';

/**
 * 获取所以component
 */
const getModules = () => {
	const componentDir = 'src/web';
	const cModuleNames = fs.readdirSync(path.resolve(componentDir));
	return cModuleNames.reduce((prev, name) => {
		const newPrev = prev;
		if (name !== '.DS_Store') {
			newPrev[name] = `${componentDir}/${name}/index.js`;
		}
		return newPrev;
	}, {});
};


/**
 * rollupConfig
 * 分别打包js & css
 * 可根据环境是否拆分js & css
 * 此处不区分
 */
const rollupConfig = () => {
	const external = Object.keys(pkg.dependencies);
	// const isDev = process.env.NODE_ENV === 'development';

	/*
			dev 情况下不做样式抽离
			其他环境下，除了基本的 js 打包外，遍历要拆分的模块，分别生成一个配置项，在这个配置项中处理各自的样式分离
	*/
	// const rollupConfig = isDev
	// 	? createModuleConfig(cModuleMap, external, isDev)
	// 	: [
	// 		createModuleConfig(cModuleMap, external, isDev)
	// 	].concat(
	// 		Object.keys(cModuleMap).map(moduleName => createStyleConfig(moduleName, external))
	// );

	return [
		creatModule(getModules(), external)
	].concat(
		Object.keys(getModules()).map(moduleName => creatModuleStyle(moduleName, external))
	);
};

/**
 * 
 * @param {component} cModuleMap 
 * @param {外部依赖} external 
 */
const creatModule = (cModuleMap, external) => ({
	// 入口
	input: {
		index: 'src/main.js',
		...cModuleMap
	},
	// 出口
	output: {
		dir: 'es', // 可以是 dir 表示输出目录 也可以是 file 表示输出文件
		format: 'es', // 输出的格式 可以是 cjs commonJs 规范 | es es Module 规范 | iife 浏览器可引入的规范
		sourceMap: true,
		entryFileNames: '[name]/index.js',
		exports: 'named'
	},
	plugins: [
		clear({
			targets: ['es']
		}),

		postcss({
			// modules: true, // 增加 css-module 功能
			extensions: ['.less', '.css'],
			use: [
				['less', {
					javascriptEnabled: true
				}]
			],
			inject: false, // dev 环境下的 样式是入住到 js 中的，其他环境不会注入
			extract: false // 无论是 dev 还是其他环境这个配置项都不做 样式的抽离
		}),

		eslint({
			include: ['src/**/*.js'],
			fix: true
		}),
		resolve(),
		...basePlugin(),
	],
	// 将模块视为外部模块，不会打包在库中
	external: id => external.some(e => id.indexOf(e) === 0),
});

/**
 * style
 */
const creatModuleStyle = (moduleName, external) => ({
	input: `src/web/${moduleName}/index.js`,
	output: {
		file: `garbage/${moduleName}.js`,
		format: 'es',
	},
	plugins: [
		clear({
			targets: ['garbage']
		}),
		// css 处理，暂时没有加插件
		postcss({
			// modules: true, // 增加 css-module 功能
			extensions: ['.less', '.css'],
			use: [
				['less', {
					javascriptEnabled: true
				}]
			],
			// 样式输出到 createModuleConfig 创建的模块文件夹下
			extract: `es/${moduleName}/style/css/index.css`
		}),
		resolve(),
		stylePlugin('web'),
		...basePlugin()
	],
	external: id => external.some(e => id.indexOf(e) === 0),
});

/**
 * babel
 */
const basePlugin = () => ([
	babel({
		babelrc: false,
		exclude: 'node_modules/**', // 只编译源代码
		runtimeHelpers: true,
		"presets": [
			[
				"@babel/preset-env",
				{
					"modules": false
				}
			],
			"@babel/preset-react"
		],
		"plugins": [
			"babel-plugin-add-module-exports"
		]
	})
]);

export default rollupConfig();