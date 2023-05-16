import type { Context } from './context'

import { prompt } from '@astrojs/cli-kit'

import { error, info, spinner, title } from '../messages'

const CHOICES = [
  { value: '@antfu/eslint-config', label: '@antfu/eslint-config', hint: '(recommended)' },
  { value: '@antfu/eslint-config-basic', label: '@antfu/eslint-config-basic' },
  { value: '@antfu/eslint-config-ts', label: '@antfu/eslint-config-ts' },
  { value: '@antfu/eslint-config-react', label: '@antfu/eslint-config-react' },
  { value: '@antfu/eslint-config-vue', label: '@antfu/eslint-config-vue' },
]

export async function eslint(ctx: Context) {
  const { eslint } = await prompt({
    name: 'eslint',
    type: 'confirm',
    label: title('ESLint'),
    message: `Need eslint ?`,
    hint: 'recommended',
    initial: true,
  })

  ctx.config.eslint = eslint

  if (eslint) {
    const choices = ctx.config.prettier
      ? CHOICES.map(({ ...choice }) => {
          choice.label += ' + prettier'
          return choice
        })
      : CHOICES

    const { eslintConfig } = await prompt({
      name: 'eslintConfig',
      type: 'select',
      label: title('ESLintConfig'),
      message: 'Select a eslint config',
      initial: '@antfu/eslint-config',
      choices,
    })

    ctx.config.eslintConfig = eslintConfig

    await spinner({
      start: `ESLint config generating...`,
      end: 'ESLint generated',
      while: () =>
        new Promise<void>((resolve) => {
          try {
            ctx.render('eslint', ctx.config)
            resolve()
          } catch (e) {
            error('error', e)
            ctx.exit(1)
          }
        }),
    })
  } else {
    await info('ESLint [skip]', "Don't need eslint")
  }
}
