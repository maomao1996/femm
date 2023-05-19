# @femm/tailwind-config

tailwindcss config used by maomao

## 安装

```sh
pnpm add -D @femm/tailwind-config
# OR
npm i -D @femm/tailwind-config
```

## 使用

> 为了兼容 `esm` 的项目，直接使用 `cjs`

创建 `tailwind.config.cjs` 文件（内容如下）

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require('@femm/tailwind-config')],
}
```

## 功能

- [x] `tailwindcss` 基础配置
- [x] 新的工具类
  - `flex-row-center` 水平垂直居中（水平排列）
  - `flex-col-center` 水平垂直居中（垂直排列）
