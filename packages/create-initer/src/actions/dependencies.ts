import { Context } from './context'

import { prompt } from '@astrojs/cli-kit'
import { execa } from 'execa'

import { error, info, spinner, title } from '../messages'

async function install(pkgManager: string, cwd: string = process.cwd()) {
  const installExec = execa(pkgManager, ['install'], { cwd })
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => reject(`Request timed out after one minute`), 60_000)
    installExec.on('error', (e) => reject(e))
    installExec.on('close', () => resolve())
  })
}

export const dependencies = async (ctx: Context) => {
  let deps = ctx.install ?? ctx.yes
  if (deps === undefined) {
    ;({ deps } = await prompt({
      name: 'deps',
      type: 'confirm',
      label: title('deps'),
      message: `Install dependencies?`,
      hint: 'recommended',
      initial: true,
    }))
    ctx.install = deps
  }
  if (ctx.dryRun) {
    await info('--dry-run', 'Skipping dependency installation')
  } else if (deps) {
    await spinner({
      start: `Dependencies installing with ${ctx.pkgManager}...`,
      end: 'Dependencies installed',
      while: () =>
        install(ctx.pkgManager).catch((e) => {
          error('error', e)
          ctx.exit(1)
        }),
    })
  } else {
    await info('Deps [skip]', 'Remember to install dependencies after setup.')
  }
}
