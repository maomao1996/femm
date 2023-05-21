import type { Context } from './context'

import { prompt } from '@astrojs/cli-kit'

import { createAction } from '../utils/create-action'
import { spinner, title } from '../messages'

const CHOICES = [
  { value: '@antfu/eslint-config', label: '@antfu/eslint-config', hint: '(recommended)' },
  { value: '@antfu/eslint-config-basic', label: '@antfu/eslint-config-basic' },
  { value: '@antfu/eslint-config-ts', label: '@antfu/eslint-config-ts' },
  { value: '@antfu/eslint-config-react', label: '@antfu/eslint-config-react' },
  { value: '@antfu/eslint-config-vue', label: '@antfu/eslint-config-vue' },
]

export const eslint = (ctx: Context) =>
  createAction({
    ctx,
    name: 'eslint',
    label: 'lint',
    actionCallback: async () => {
      const choices = ctx.config.prettier
        ? CHOICES.map(({ ...choice }) => {
            choice.label += ' + prettier'
            return choice
          })
        : CHOICES

      const { eslintConfig } = await prompt({
        name: 'eslintConfig',
        type: 'select',
        label: title('eslint'),
        message: 'Select a eslint config',
        initial: '@antfu/eslint-config',
        choices,
      })

      ctx.config.eslintConfig = eslintConfig

      await spinner({
        start: `Generating eslint config...`,
        end: 'Generated eslint config',
        while: () => ctx.render('eslint', ctx.config),
      })
    },
  })
