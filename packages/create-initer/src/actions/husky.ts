import type { Context } from './context'

import { createAction } from '../utils/create-action'
import { error, spinner } from '../messages'
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
        runCommand('npx', ['husky', 'set', '.husky/pre-commit', 'npx lint-staged --quiet']).catch(
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
        runCommand('npx', ['husky', 'set', '.husky/commit-msg', 'npx femm-verify-commit $1']).catch(
          (e) => {
            error('error', e)
            ctx.exit(1)
          },
        ),
    })
  }
}

export const husky = (ctx: Context) =>
  createAction({
    ctx,
    name: 'husky',
    label: 'git',
    actionCallback: async () => {
      await ctx.render('husky')
      await installHusky(ctx)
    },
  })
