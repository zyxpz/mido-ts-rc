import path from 'path';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const { entry } = require(path.join(process.cwd(), 'source', 'entry'));

const milieu = process.env.NODE_ENV || 'development';

export default {
	webpack(config) {
		let newConfig = config;

		// 删除默认html loader
		newConfig.module.rules.some((d, i) => {
			if (/\.html/.test(d.test)) {
				newConfig.module.rules.splice(i, 1);
			}
		});

		// 删除css，less mini-css-extract-plugin
		// newConfig.module.rules.some(d => {
		// 	if (/\.css/.test(d.test) || /\.less/.test(d.test)) {
		// 		d.use.some((cd, ci) => {
		// 			if (/mini-css-extract-plugin/.test(cd.loader)) {
		// 				d.use.splice(ci, 1);
		// 			}
		// 		});
		// 	}
		// });

		// 删除默认output
		delete newConfig.output.filename;

		// 删除默认MiniCssExtractPlugin
		newConfig.plugins.some((d, i) => {
			if (/.css/.test(d.options.filename)) {
				newConfig.plugins.splice(i, 1);
			}
		});
		newConfig = {
			entry,
			output: {
				filename({ chunk: {
					entryModule: {
						id
					}
				} }) {
					if (milieu !== 'production') {
						return /index.html/.test(id) ? '[name].js' : '[name].js';
					} else {
						return /index.html/.test(id) ?
							'[name].js' :
							'[name]/[name].js';
					}
				}
			},
			resolve: {
				alias: {
					"@": `${process.cwd()}/src`
				}
			},
			module: {
				rules: [
					{
						test: /\.html$/i,
						loader: require.resolve('file-loader'),
						options: {
							name(file) {
								if (milieu === 'production') {
									if (/index/.test(file)) {
										return '[name].[ext]';
									}
									return `/[name]/[name].[ext]`;
								}
								return '[name].[ext]';
							}
						}
					}
				]
			},
			externals: {
				'react': 'React',
				'react-dom': 'ReactDOM',
				'antd': 'antd',
				'xlsx': 'XLSX'
			},
			plugins: [
				new MiniCssExtractPlugin({
					filename: milieu !== 'production' ? '[name].css' : '[name]/[name].css',
					allChunks: true
				})
			],
			optimization: {
				splitChunks: {
					cacheGroups: {
						default: {
							minChunks: 2,
							priority: -20,
							reuseExistingChunk: true,
						},
						// styles: {
						// 	name: 'styles',
						// 	test: /\.(css|less)$/,
						// 	chunks: 'all',
						// 	enforce: true,
						// },
						// vendor: {
						// 	chunks: "all",
						// 	test: /[\\/]node_modules[\\/]/,
						// 	name: "common",
						// 	maxInitialRequests: 5,
						// 	minSize: 0,
						// }
						// common: {
						// 	chunks: 'all',
						// 	test: /.(js|jsx)$/,
						// 	name: "commons"
						// }
					}
				}
			}
		};
		return newConfig;
	},
	babel: {
		plugins: [
			[
				require(`${process.cwd()}/config/babel-plugin-import`), 
				{
					libraryName: "@/main",
					libraryDirectory: `${process.cwd()}/src/web`
				}
			]
		]
	}
};