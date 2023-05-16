import { execa } from 'execa'

export async function runCommand(
  command: string,
  args: string[] = [],
  cwd: string = process.cwd(),
) {
  const runCommandExec = execa(command, args, { cwd })
  return new Promise<void>((resolve, reject) => {
    runCommandExec.on('error', (e) => reject(e))
    runCommandExec.on('close', () => resolve())
  })
}
