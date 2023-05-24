import type { Context } from './context'

import path from 'node:path'
import fs from 'fs-extra'

import { createAction } from '../utils/create-action'
import { spinner } from '../messages'

export const nvmrc = (ctx: Context) => {
  const version = String(parseInt(process.version.slice(1), 10))

  return createAction({
    ctx,
    name: 'nvmrc',
    label: 'env',
    hint: version,
    actionCallback: () =>
      spinner({
        start: `Generating nvmrc config...`,
        end: 'Generated nvmrc config',
        while: () => fs.outputFile(path.join(process.cwd(), '.nvmrc'), version),
      }),
  })
}
