const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  // 入口文件
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // webpack 只能理解 JavaScript 和 JSON 文件，加载别的文件类型需要loader
  module: {
    rules: [
      // 使用babel-loader转换jsx
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      // 加载 CSS 文件
      {
        test: /\.s?[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          { loader: 'style-loader' },
          {
            // 将 CSS 转化成 CommonJS 模块
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            // 将 Sass 编译成 CSS
            loader: 'sass-loader'
          }
        ]
      },
      // svg sprite
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              // 以icon-开头命名 <symbol> id 属性
              symbolId: 'icon-[name]'
            }
          }
        ],
        // 仅处理src/icons目录下的svg文件
        include: [path.resolve(__dirname, 'src/icons')]
      }
    ]
  },
  // html-webpack-plugin 为应用程序生成一个 HTML 文件，并自动将生成的所有 bundle 注入到此文件中。
  plugins: [new HtmlWebpackPlugin({ template: './public/index.html' })],

  resolve: {
    // 别名
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }
}
