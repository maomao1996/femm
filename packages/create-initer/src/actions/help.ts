import { printHelp } from '../messages.js'

export function help() {
  printHelp({
    commandName: 'create-initer',
    usage: '[...flags]',
    headline: 'An easy way to create various configuration files.',
    tables: {
      Flags: [
        ['--help (-h)', 'See all available flags.'],
        ['--yes (-y)', 'Skip all prompt by accepting defaults.']
      ]
    }
  })
}
