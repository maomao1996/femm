/**
 * Prettier 配置项
 * https://prettier.io/docs/en/options.html
 */
module.exports = {
  printWidth: 100, // 每行代码的最佳长度，超出该长度则格式化
  tabWidth: 2, // 一个缩进所需的空格数
  useTabs: false, // 使用空格进行缩进
  semi: false, // 语句末尾不添加分号
  quoteProps: 'as-needed', // 仅在必需时为对象的 key 添加引号
  singleQuote: true, // 使用单引号
  jsxSingleQuote: false, // 在 jsx 中使用双引号
  trailingComma: 'none', // 不添加尾随逗号
  bracketSpacing: true, // 在对象花括号内的两旁添加空格 => { foo: bar }
  bracketSameLine: false, // HTML元素（包括 JSX 等）具有多个属性时，将结束标签右尖括号 ＞ 另起一行
  arrowParens: 'always', // 箭头函数仅有一个参数时，参数也添加括号 (x) => x
  proseWrap: 'preserve', // 对 Markdown 文本换行不进行任何操作，保持原样
  htmlWhitespaceSensitivity: 'ignore', // 对 HTML 全局空白不敏感
  vueIndentScriptAndStyle: false // 不对 vue 中的 script 及 style 标签进行缩进
}
