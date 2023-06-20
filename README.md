# react-svg-icon

In React program Simplify the use of icons using svg-sprite-loader

在 React 程序中使用 svg-sprite-loader 简化 icons 的使用

```js
npm install
npm run serve
```

### 1. 安装 svg-sprite-loader 并配置 webpack

`svg-sprite-loader`会把`svg`塞到一个个`symbol` 中，合成一个大的 svg。最后将这个大的`svg`插入`body`中。`symbol`的`id`如果不指定，就是你的文件名。

```js
npm install svg-sprite-loader -D
```

```js
// webpack.js
module: {
  rules: [
    // svg sprite
    {
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-sprite-loader',
          options: {
            // 以icon-[文件名]生成<symbol> id 属性
            symbolId: 'icon-[name]'
          }
        }
      ],
      // 仅处理src/icons目录下的svg文件
      include: [path.resolve(__dirname, 'src/icons')]
    }
  ]
}
```

### 2. 新建 icons 文件夹保存自己的 icon

```
-icons
    -- svg
        --one.svg
        --two.svg
        ...
    -- index.js
```

- 自动导入`svg`文件

```js
// index.js
const req = require.context('./svg', true, /\.svg$/)

// 导入所有svg文件为模块
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
```

- 在`react`入口文件`index.js`导入`icons/index.js`

```js
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
const container = document.getElementById('root')
const root = createRoot(container)
import './icons'
root.render(<App />)
```

### 3. 自定义 Icon 组件

```js
// src/components/Icon/index.jsx

import React from 'react'

export default function Icon(props) {
  const { name } = props
  // props: className,style,icon,size,color...
  return (
    <svg>
      <use xlinkHref={`#icon-${name}`} />
    </svg>
  )
}
```

### 4. 使用方式

```js
// App.js

import Icon from './components/Icon/index.jsx'

export default function App() {
  return (
    <>
      <Icon name="one" />
      <Icon name="two" />
    </>
  )
}
```
