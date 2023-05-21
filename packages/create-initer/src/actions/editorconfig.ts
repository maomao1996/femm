import type { Context } from './context'

import * as fs from 'node:fs'

import { createAction } from '../utils/create-action'
import { spinner } from '../messages'

export const editorconfig = async (ctx: Context) => {
  if (!fs.existsSync('./.editorconfig')) {
    await createAction({
      ctx,
      name: 'editorconfig',
      label: 'editor',
      actionCallback: () =>
        spinner({
          start: `Generating editor config...`,
          end: 'Generated editor config',
          while: () => ctx.render('editorconfig'),
        }),
    })
  }
}
