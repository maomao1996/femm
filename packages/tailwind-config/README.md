# @femm/tailwind-config

茂茂的 `tailwindcss` 配置

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
  presets: [require('@femm/tailwind-config')]
}
```
