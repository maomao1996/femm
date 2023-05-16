/**
 * Prettier 配置项
 * https://prettier.io/docs/en/options.html
 */
module.exports = {
  // 每行代码的最佳长度，超出该长度则格式化
  printWidth: 100,
  // 一个缩进使用 2 个空格
  tabWidth: 2,
  // 缩进使用空格
  useTabs: false,
  // 语句末尾不添加分号
  semi: false,
  // 仅在必需时为对象的 key 添加引号
  quoteProps: 'as-needed',
  // 使用单引号
  singleQuote: true,
  // 在 jsx 中使用双引号
  jsxSingleQuote: false,
  // 添加尾随逗号
  trailingComma: 'all',
  // 在对象花括号内的两旁添加空格 => { foo: bar }
  bracketSpacing: true,
  // HTML元素（包括 JSX 等）具有多个属性时，将结束标签右尖括号 ＞ 另起一行
  bracketSameLine: false,
  // 箭头函数仅有一个参数时，参数也添加括号 (x) => x
  arrowParens: 'always',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 对所有文件进行格式化，而不是只对在开头含有特定注释（@prettier 或 @format）的文件进行格式化
  requirePragma: false,
  // 格式化的同时自动插入 @format 的特殊注释（表示该文件已被格式化）
  insertPragma: false,
  // 对 Markdown 文本换行不进行任何操作，保持原样
  proseWrap: 'preserve',
  // 对 HTML 全局空白不敏感
  htmlWhitespaceSensitivity: 'ignore',
  // 不对 vue 中的 script 及 style 标签进行缩进
  vueIndentScriptAndStyle: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 自动格式化嵌入的代码内容
  embeddedLanguageFormatting: 'auto',
  // 不强制 html vue jsx 中的属性（具有多个时）单独占一行
  singleAttributePerLine: false
}
