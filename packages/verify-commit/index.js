/**
 * 基于 vue 项目中的 verify-commit-msg.js 修改
 * https://github.com/vuejs/vue/blob/main/scripts/verify-commit-msg.js
 * https://github.com/vuejs/vue/blob/main/.github/COMMIT_CONVENTION.md
 */

import { readFileSync } from 'node:fs'
import colors from 'picocolors'
import terminalLink from 'terminal-link'

const msgPath = process.argv[2]
const msg = readFileSync(msgPath, 'utf-8').trim()

const commitRE =
  /^((revert|wip|draft): )?(feat|fix|docs|style|refactor|perf|types|test|build|ci|chore)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.log()
  console.error(
    `  ${colors.bgRed(colors.white(' ERROR '))} ${colors.red(
      `invalid commit message format （无效的提交信息格式）.`,
    )}\n\n` +
      colors.red(
        `  Please use the correct commit message format. Examples:\n\n`,
      ) +
      `    ${colors.green(`feat: A new feature`)}\n` +
      `    ${colors.green(`fix: A bug fix`)}\n\n` +
      colors.red(`  See ${terminalLink('commit convention',

      'https://maomao.fe-mm.com/workflow/style-guide#git-%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83')} for more details.\n`),
  )
  process.exit(1)
}
