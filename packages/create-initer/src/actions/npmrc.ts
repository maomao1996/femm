import type { Context } from './context'

import { createAction } from '../utils/create-action'
import { spinner } from '../messages'

export const npmrc = (ctx: Context) =>
  createAction({
    ctx,
    name: 'npmrc',
    label: 'env',
    actionCallback: () =>
      spinner({
        start: `Generating npmrc config...`,
        end: 'Generated npmrc config',
        while: () => ctx.render('npmrc'),
      }),
  })
