import type { Context } from './context'

import { createAction } from '../utils/create-action'
import { spinner } from '../messages'

export const lintStaged = async (ctx: Context) => {
  if (ctx.config.prettier || ctx.config.eslint) {
    await createAction({
      ctx,
      name: 'lint-staged',
      label: 'git',
      actionCallback: () =>
        spinner({
          start: `Generating lint-staged config...`,
          end: 'Generated lint-staged config',
          while: () => ctx.render('lint-staged', ctx.config),
        }),
    })
  }
}
