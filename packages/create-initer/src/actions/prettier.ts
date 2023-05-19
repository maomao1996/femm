import type { Context } from './context'

import { prompt } from '@astrojs/cli-kit'

import { error, info, spinner, title } from '../messages'

export async function prettier(ctx: Context) {
  const { needPrettier } = await prompt({
    name: 'needPrettier',
    type: 'confirm',
    label: title('format'),
    message: `Need prettier ?`,
    hint: 'recommended',
    initial: true,
  })

  ctx.config.prettier = needPrettier

  if (needPrettier) {
    await spinner({
      start: `Generating prettier config...`,
      end: 'Generated prettier config',
      while: () =>
        new Promise<void>((resolve) => {
          try {
            ctx.render('prettier')
            resolve()
          } catch (e) {
            error('error', e)
            ctx.exit(1)
          }
        }),
    })
  } else {
    await info('Format [skip]', "Don't need prettier")
  }
}
