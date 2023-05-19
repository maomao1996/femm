#!/usr/bin/env node

import { color, label } from '@astrojs/cli-kit'

import {
  getContext,
  help,
  pkg,
  prettier,
  eslint,
  lintStaged,
  commitlint,
  husky,
  editorconfig,
  gitignore,
  def,
  dependencies,
} from './actions'
import { error, success } from './messages'

async function main() {
  const cleanArgv = process.argv.slice(2).filter((arg) => arg !== '--')
  const ctx = await getContext(cleanArgv)

  if (ctx.help) {
    help()
    ctx.exit(0)
  }

  console.log(`Welcome to use ${label('create-initer', color.bgGreen, color.black)}`)
  console.log()
  console.log(label('Starting!', color.bgBlue, color.black))
  console.log()

  await pkg(ctx)

  if (ctx.yes) {
    await def(ctx)
    success()
    ctx.exit(0)
  }

  const steps = [
    prettier,
    eslint,
    lintStaged,
    commitlint,
    husky,
    gitignore,
    editorconfig,
    dependencies,
  ]
  for (const step of steps) {
    await step(ctx)
  }
  success()
  ctx.exit(0)
}

main().catch((e) => {
  error('ERROR', e)
})
