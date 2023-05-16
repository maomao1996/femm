import type { Context } from './context'

import { prompt } from '@astrojs/cli-kit'

import { error, info, spinner, title } from '../messages'
import { runCommand } from '../utils/run-command'

export async function installHusky(ctx: Context) {
  await spinner({
    start: `Husky installing...`,
    end: 'Husky installed',
    while: () =>
      runCommand('npx', ['husky', 'install']).catch((e) => {
        error('error', e)
        ctx.exit(1)
      }),
  })

  if (ctx.config.lintStaged) {
    await spinner({
      start: `Husky adding pre-commit hook...`,
      end: 'Husky added pre-commit hook',
      while: () =>
        runCommand('npx', ['husky', 'add', '.husky/pre-commit', 'npx lint-staged --quiet']).catch(
          (e) => {
            error('error', e)
            ctx.exit(1)
          },
        ),
    })
  }

  if (ctx.config.commitlint) {
    await spinner({
      start: `Husky adding commit-msg hook...`,
      end: 'Husky added commit-msg hook',
      while: () =>
        runCommand('npx', ['husky', 'add', '.husky/commit-msg', 'npx femm-verify-commit $1']).catch(
          (e) => {
            error('error', e)
            ctx.exit(1)
          },
        ),
    })
  }
}

export async function husky(ctx: Context) {
  if (ctx.config.lintStaged || ctx.config.commitlint) {
    const { needHusky } = await prompt({
      name: 'needHusky',
      type: 'confirm',
      label: title('Husky'),
      message: `Need husky to check commit-msg and lint-staged?`,
      hint: 'recommended',
      initial: true,
    })

    if (needHusky) {
      ctx.render('husky')
      await installHusky(ctx)
    } else {
      await info('Husky [skip]', "Don't need husky")
    }
  }
}
