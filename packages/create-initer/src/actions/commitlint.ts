import type { Context } from './context'

import { prompt } from '@astrojs/cli-kit'

import { error, info, spinner, title } from '../messages'

export async function commitlint(ctx: Context) {
  const { needCommitlint } = await prompt({
    name: 'needCommitlint',
    type: 'confirm',
    label: title('git'),
    message: `Need commitlint ?`,
    hint: 'recommended',
    initial: true,
  })

  ctx.config.commitlint = needCommitlint

  if (needCommitlint) {
    await spinner({
      start: `Generating commitlint config...`,
      end: 'Generated commitlint config',
      while: () =>
        new Promise<void>((resolve) => {
          try {
            ctx.render('commitlint')
            resolve()
          } catch (e) {
            error('error', e)
            ctx.exit(1)
          }
        }),
    })
  } else {
    await info('Git [skip]', "Don't need commitlint")
  }
}
