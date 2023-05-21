import type { Context } from '../actions'

import { prompt } from '@astrojs/cli-kit'
import camelCase from 'camelcase'

import { error, info, title } from '../messages'

export async function createAction({
  ctx,
  name,
  label,
  initial = true,
  actionCallback,
}: {
  ctx: Context
  name: string
  label?: string
  initial?: boolean
  actionCallback?: () => Promise<void>
}) {
  const { needAction } = await prompt({
    name: 'needAction',
    type: 'confirm',
    label: title(label),
    message: `Need ${name}?`,
    hint: 'recommended',
    initial,
  })

  ctx.config[camelCase(name)] = needAction

  if (needAction) {
    try {
      await actionCallback?.()
    } catch (e) {
      error('error', e)
      ctx.exit(1)
    }
  } else {
    await info(`${camelCase(label, { pascalCase: true })} [skip]`, `Don't need ${name}`)
  }
}
