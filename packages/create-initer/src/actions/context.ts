import arg from 'arg'
import detectPackageManager from 'which-pm-runs'

import { renderTemplate } from '../render-template'
import { error } from '../messages'

export interface Context {
  help: boolean
  yes?: boolean
  install?: boolean
  dryRun?: boolean

  pkgManager: string
  config: Record<string, unknown>

  render: (templateName: string, templateData?: Record<string, unknown>) => Promise<void>
  exit(code: number): never
}

export function getContext(argv: string[]): Context {
  const flags = arg(
    {
      '--help': Boolean,
      '-h': '--help',

      '--yes': Boolean,
      '-y': '--yes',

      '--install': Boolean,
      '--no-install': Boolean,
      '--dry-run': Boolean,
    },
    { argv, permissive: true },
  )
  const pkgManager = detectPackageManager()?.name ?? 'npm'
  const {
    '--help': help = false,
    '--yes': yes,
    '--install': install,
    '--no-install': noInstall,
    '--dry-run': dryRun,
  } = flags

  const context: Context = {
    help,
    yes,

    install: install ?? (noInstall ? false : undefined),
    dryRun,

    pkgManager,
    config: {},

    render: (templateName, templateData) =>
      new Promise<void>((resolve) => {
        try {
          renderTemplate(templateName, templateData)
          resolve()
        } catch (e) {
          error('render error', e)
          context.exit(1)
        }
      }),
    exit(code) {
      process.exit(code)
    },
  }

  return context
}
