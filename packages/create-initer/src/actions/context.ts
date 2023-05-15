import arg from 'arg'

import { renderTemplate } from '../render-template'

export interface Context {
  help: boolean
  input: boolean

  config: Record<string, unknown>

  render: typeof renderTemplate
  exit(code: number): never
}

export function getContext(argv: string[]): Context {
  const flags = arg(
    {
      '--help': Boolean,
      '-h': '--help',

      '--input': Boolean,
      '-i': '--input'
    },
    { argv, permissive: true }
  )
  const { '--help': help = false, '--input': input = true } = flags

  const context: Context = {
    help,
    input,
    config: {},

    render: renderTemplate,
    exit(code) {
      process.exit(code)
    }
  }

  return context
}
