import type { Context } from './context'

import { createAction } from '../utils/create-action'
import { spinner } from '../messages'

export const commitlint = (ctx: Context) =>
  createAction({
    ctx,
    name: 'commitlint',
    label: 'git',
    actionCallback: () =>
      spinner({
        start: `Generating commitlint config...`,
        end: 'Generated commitlint config',
        while: () => ctx.render('commitlint'),
      }),
  })
