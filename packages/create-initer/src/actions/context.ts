import arg from 'arg'
import detectPackageManager from 'which-pm-runs'

import { renderTemplate } from '../render-template'

export interface Context {
  help: boolean
  input: boolean
  yes: boolean

  pkgManager: string
  install?: boolean
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
      '-i': '--input',

      '--yes': Boolean,
      '-y': '--yes',

      '--install': Boolean,
      '--no-install': Boolean
    },
    { argv, permissive: true }
  )
  const pkgManager = detectPackageManager()?.name ?? 'npm'
  const {
    '--help': help = false,
    '--input': input = false,
    '--yes': yes,
    '--install': install,
    '--no-install': noInstall
  } = flags

  const context: Context = {
    help,
    input,
    yes,

    pkgManager,
    install: install ?? (noInstall ? false : undefined),
    config: {},

    render: renderTemplate,
    exit(code) {
      process.exit(code)
    }
  }

  return context
}
