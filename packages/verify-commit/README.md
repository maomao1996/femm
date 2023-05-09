# @femm/verify-commit

一个简单的 commit message 校验工具

## 安装

```sh
pnpm add -D @femm/verify-commit simple-git-hooks
# OR
npm i -D @femm/verify-commit simple-git-hooks
```

## 使用

### 添加配置项到 `package.json`

```sh
# 使用 npx + bin 运行
npm pkg set simple-git-hooks.commit-msg='npx femm-verify-commit $1'

# OR 使用 pnpm + bin 运行
npm pkg set simple-git-hooks.commit-msg='pnpm femm-verify-commit $1'

# OR 使用 node 运行
npm pkg set simple-git-hooks.commit-msg='node ./node_modules/@femm/verify-commit/index.js $1'
```

### 注册 `simple-git-hooks`

> 当 `simple-git-hooks` 有更新时，需要重新注册

```sh
npx simple-git-hooks
```

## 相关链接

- [vue — verify-commit-msg.js | GitHub](https://github.com/vuejs/vue/blob/main/scripts/verify-commit-msg.js)
- [simple-git-hooks | GitHub](https://github.com/toplenboren/simple-git-hooks)
- [Git 提交规范 | 茂茂物语](https://maomao.fe-mm.com/workflow/style-guide#git-%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83)
