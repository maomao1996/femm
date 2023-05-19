import type { Context } from './context'

import * as fs from 'node:fs'
import { prompt } from '@astrojs/cli-kit'

import { error, spinner, title } from '../messages'
import { runCommand } from '../utils/run-command'

export async function pkg(ctx: Context) {
  if (!fs.existsSync('./package.json')) {
    const { createPkg } = await prompt({
      name: 'createPkg',
      type: 'confirm',
      label: title('pkg'),
      message: `Create package.json ?`,
      hint: 'recommended',
      initial: true,
    })

    if (!createPkg) {
      await error('error', 'create-initer need package.json to work')
      ctx.exit(0)
    }

    await spinner({
      start: 'package.json creating...',
      end: 'package.json created',
      while: () =>
        runCommand('npm', ['init', '-y']).catch((e) => {
          error('error', e)
          ctx.exit(1)
        }),
    })
  }
}
