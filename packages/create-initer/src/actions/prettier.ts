import type { Context } from './context'

import { createAction } from '../utils/create-action'
import { spinner } from '../messages'

export const prettier = (ctx: Context) =>
  createAction({
    ctx,
    name: 'prettier',
    label: 'format',
    actionCallback: () =>
      spinner({
        start: `Generating prettier config...`,
        end: 'Generated prettier config',
        while: () => ctx.render('prettier'),
      }),
  })
