import type { Context } from './context'

import * as fs from 'node:fs'

import { createAction } from '../utils/create-action'
import { spinner } from '../messages'

export const gitignore = async (ctx: Context) => {
  if (!fs.existsSync('./.gitignore')) {
    await createAction({
      ctx,
      name: 'gitignore',
      label: 'git',
      actionCallback: () =>
        spinner({
          start: `Generating gitignore config...`,
          end: 'Generated gitignore config',
          while: () => ctx.render('gitignore'),
        }),
    })
  }
}
