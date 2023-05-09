# @femm/verify-commit

一个简单的 commit message 校验工具

## 安装与使用

### 使用 `simple-git-hooks` 运行

```sh
pnpm add -D @femm/verify-commit simple-git-hooks
# OR
npm i -D @femm/verify-commit simple-git-hooks
```

#### 添加配置项到 `package.json`

```sh
# 使用 npx + bin 运行
npm pkg set simple-git-hooks.commit-msg='npx femm-verify-commit $1'

# OR 使用 pnpm + bin 运行
npm pkg set simple-git-hooks.commit-msg='pnpm femm-verify-commit $1'

# OR 使用 node 运行
npm pkg set simple-git-hooks.commit-msg='node ./node_modules/@femm/verify-commit/index.js $1'
```

#### 注册 `git-hooks`

> 当 `simple-git-hooks` 有更新时，需要重新注册

```sh
npx simple-git-hooks
```

> 添加 `prepare` 脚本，可以在 `install` 时自动注册已经配置的 `git-hooks`，第一次使用时需要手动运行一次 `npm run prepare`

```sh
npm pkg set scripts.prepare="npx simple-git-hooks"
```

### 使用 `husky` 运行

```sh
pnpm dlx husky-init && pnpm add -D @femm/verify-commit
# OR
npx husky-init && npm i -D @femm/verify-commit
```

#### 注册 `git-hooks`

```sh
npx husky add .husky/commit-msg 'npx femm-verify-commit $1'
```

## 相关链接

- [vue — verify-commit-msg.js | GitHub](https://github.com/vuejs/vue/blob/main/scripts/verify-commit-msg.js)
- [Git 提交规范 | 茂茂物语](https://maomao.fe-mm.com/workflow/style-guide#git-%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83)
- [simple-git-hooks | GitHub](https://github.com/toplenboren/simple-git-hooks)
- [husky | GitHub](https://github.com/typicode/husky)
