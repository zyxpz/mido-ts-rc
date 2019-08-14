# mido-rc

<details>
<summary>开发</summary>

1. 启动(首次启动或新建组件启动)
- npm start
2. 创建
- npm run cp
  + 输入想要创建项目名
  + 命名规范首字母为大写
3. 打包
- npm run build
4. 上传npm
- npm run publish

</details>

<details open=true>
<summary>引用，按需加载</summary>

## 使用方式 => 按需加载，需要安装 `babel-plugin-import`

```vim
import conponentName from 'mido-rc/es/componentName';

// 引入css
import 'mido-rc/es/componentName/style/css';
// 引入less
import 'mido-rc/es/componentName/style'
```

```vim
npm install babel-plugin-import --save-dev
```

- 配置`.babelrc`

```vim
{
	"plugins": [
		[
			"import",
				{
					"libraryName": "mido-rc",
					"libraryDirectory": "es",
                    "style": true
				}
		]
	]
}
```

- 使用

```js
import { xxx } from 'mido-rc';
```
</details>

## 组件
