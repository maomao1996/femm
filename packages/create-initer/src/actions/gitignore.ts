import type { Context } from './context'

import * as fs from 'node:fs'
import { prompt } from '@astrojs/cli-kit'

import { error, info, spinner, title } from '../messages'

export async function gitignore(ctx: Context) {
  if (!fs.existsSync('./.gitignore')) {
    const { needGitignore } = await prompt({
      name: 'needGitignore',
      type: 'confirm',
      label: title('Gitignore'),
      message: `Need gitignore ?`,
      hint: 'recommended',
      initial: true,
    })

    ctx.config.gitignore = needGitignore

    if (needGitignore) {
      await spinner({
        start: `Gitignore config generating...`,
        end: 'Gitignore generated',
        while: () =>
          new Promise<void>((resolve) => {
            try {
              ctx.render('gitignore')
              resolve()
            } catch (e) {
              error('error', e)
              ctx.exit(1)
            }
          }),
      })
    } else {
      await info('Gitignore [skip]', "Don't need gitignore")
    }
  }
}
