import type { Context } from './context'

import * as fs from 'node:fs'
import { prompt } from '@astrojs/cli-kit'
import { error, info, spinner, title } from '../messages'

export async function editorconfig(ctx: Context) {
  if (ctx.input && !fs.existsSync('./.editorconfig')) {
    const { needEditorconfig } = await prompt({
      name: 'needEditorconfig',
      type: 'confirm',
      label: title('Editorconfig'),
      message: `Need editorconfig ?`,
      hint: 'recommended',
      initial: true
    })

    ctx.config.commitlint = needEditorconfig

    if (needEditorconfig) {
      await spinner({
        start: `Editorconfig config generating...`,
        end: 'Editorconfig generated',
        while: () =>
          new Promise<void>((resolve) => {
            try {
              ctx.render('editorconfig')
              resolve()
            } catch (e) {
              error('error', e)
              ctx.exit(1)
            }
          })
      })
    } else {
      await info('Editorconfig [skip]', "Don't need editorconfig")
    }
  }
}
