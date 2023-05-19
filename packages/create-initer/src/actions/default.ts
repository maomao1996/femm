import type { Context } from './context'

import * as fs from 'node:fs'

import { error, warn, spinner } from '../messages'
import { installHusky } from './husky'
import { dependencies } from './dependencies'

export async function def(ctx: Context) {
  const hasGit = fs.existsSync('./.git')

  await spinner({
    start: `Generating default config...`,
    end: 'Generated default config',
    while: () =>
      new Promise<void>(async (resolve) => {
        try {
          ctx.config = {
            prettier: true,
            eslint: true,
            eslintConfig: '@antfu/eslint-config',
            lintStaged: true,
            commitlint: true,
          }
          ctx.render('prettier')
          ctx.render('eslint', ctx.config)
          ctx.render('lint-staged', ctx.config)
          ctx.render('commitlint')
          hasGit && ctx.render('husky', ctx.config)
          !fs.existsSync('./.editorconfig') && ctx.render('editorconfig')
          !fs.existsSync('./.gitignore') && ctx.render('gitignore')

          resolve()
        } catch (e) {
          error('error', e)
          ctx.exit(1)
        }
      }),
  })

  if (hasGit) {
    await installHusky(ctx)
  } else {
    await warn('Warning', 'husky need .git to work')
  }

  await dependencies(ctx)
}
