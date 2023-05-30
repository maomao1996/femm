# create-initer

> An easy way to create various configuration files

一个用于生成各种配置文件的简易工具

## 使用

```sh
# pnpm
pnpm create initer@latest

# npm
npm create initer@latest

# yarn
yarn create initer@latest
```

## 已支持的配置文件

> 功能正在完善中，欢迎提供更多的配置文件

- [x] prettier
- [x] eslint（使用 [@antfu/eslint-config](https://github.com/antfu/eslint-config) 配置规则 ）
- [x] lint-staged
- [x] commitlint（使用 [@femm/verify-commit](/packages/verify-commit) 进行校验 ）
- [x] husky
- [x] editorconfig
- [x] gitignore
- [x] npmrc
- [x] nvmrc

## 说明

- 感谢 [@tangxve](https://github.com/tangxve) 和 [@h7ml](https://github.com/h7ml) 提供了灵感和建议
- 参考了这些优秀库的实现
  - [create-astro](https://github.com/withastro/astro/blob/main/packages/create-astro)
  - [create-vue](https://github.com/vuejs/create-vue)
  - [create-lint-config](https://github.com/liruifengv/create-lint-config)
