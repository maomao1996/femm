/* eslint no-console: 'off' */
import { color, label, say as houston, spinner as load } from '@astrojs/cli-kit'
import { align, sleep } from '@astrojs/cli-kit/utils'

let stdout = process.stdout
/** @internal Used to mock `process.stdout.write` for testing purposes */
export function setStdout(writable: typeof process.stdout) {
  stdout = writable
}

export async function say(messages: string | string[], { clear = false, hat = '' } = {}) {
  return houston(messages, { clear, hat, stdout })
}

/**
 * spinner color gradient
 * #883AE3
 * #7B30E7
 * #6B22EF
 * #5C1CF8
 * #4E11F8
 * #3640FC
 * #2A5AFD
 * #2387F1
 * #3DA9A3
 * #47DA93
 */
export async function spinner(args: {
  start: string
  end: string
  while: (...args: any) => Promise<any>
}) {
  await load(args, { stdout })
}

export const createIndent = (length: number) => ' '.repeat(length)
const TITLE_MAX_LENGTH = 9

export const title = (text: string) => align(label(text), 'end', TITLE_MAX_LENGTH) + ' '

export const log = (message: string) => stdout.write(message + '\n')

const formatLog = (title: string, text: string) => {
  if (stdout.columns < 80) {
    log(`${createIndent(TITLE_MAX_LENGTH - 2)} ${title}`)
    log(`${createIndent(TITLE_MAX_LENGTH + 2)} ${color.dim(text)}`)
  } else {
    log(`${createIndent(TITLE_MAX_LENGTH - 2)} ${title} ${color.dim(text)}`)
  }
}

export const info = async (prefix: string, text: string) => {
  await sleep(100)
  formatLog(color.cyan(`◼  ${prefix}`), text)
}

export const warn = (prefix: string, text: string) => formatLog(color.yellow(`⚠️  ${prefix}`), text)

export const error = (prefix: string, text: string) => formatLog(color.red(`▲  ${prefix}`), text)

export const success = () => {
  log('')
  log(label('Success !', color.bgGreen, color.black))
  log('')
}

export function printHelp({
  commandName,
  headline,
  usage,
  tables,
  description,
}: {
  commandName: string
  headline?: string
  usage?: string
  tables?: Record<string, [command: string, help: string][]>
  description?: string
}) {
  const linebreak = () => ''
  const table = (rows: [string, string][], { padding }: { padding: number }) => {
    const split = stdout.columns < 60
    let raw = ''

    for (const row of rows) {
      if (split) {
        raw += `    ${row[0]}\n    `
      } else {
        raw += `${`${row[0]}`.padStart(padding)}`
      }
      raw += '  ' + color.dim(row[1]) + '\n'
    }

    return raw.slice(0, -1) // remove latest \n
  }

  let message = []

  if (headline) {
    message.push(
      linebreak(),
      `${title(commandName)} ${color.green(`v${process.env.PACKAGE_VERSION ?? ''}`)} ${headline}`,
    )
  }

  if (usage) {
    message.push(linebreak(), `${color.green(commandName)} ${color.bold(usage)}`)
  }

  if (tables) {
    function calculateTablePadding(rows: [string, string][]) {
      return rows.reduce((val, [first]) => Math.max(val, first.length), 0)
    }
    const tableEntries = Object.entries(tables)
    const padding = Math.max(...tableEntries.map(([, rows]) => calculateTablePadding(rows)))
    for (const [, tableRows] of tableEntries) {
      message.push(linebreak(), table(tableRows, { padding }))
    }
  }

  if (description) {
    message.push(linebreak(), `${description}`)
  }

  log(message.join('\n') + '\n')
}
