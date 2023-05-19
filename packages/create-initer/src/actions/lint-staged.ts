import type { Context } from './context'

import { prompt } from '@astrojs/cli-kit'

import { error, info, spinner, title } from '../messages'

export async function lintStaged(ctx: Context) {
  if (ctx.config.prettier || ctx.config.eslint) {
    const { needLintStaged } = await prompt({
      name: 'needLintStaged',
      type: 'confirm',
      label: title('git'),
      message: `Need lint-staged ?`,
      hint: 'recommended',
      initial: true,
    })

    ctx.config.lintStaged = needLintStaged

    if (needLintStaged) {
      await spinner({
        start: `Generating lint-staged config...`,
        end: 'Generated lint-staged config',
        while: () =>
          new Promise<void>((resolve) => {
            try {
              ctx.render('lint-staged', ctx.config)
              resolve()
            } catch (e) {
              error('error', e)
              ctx.exit(1)
            }
          }),
      })
    } else {
      await info('Git [skip]', "Don't need lint-staged")
    }
  }
}
