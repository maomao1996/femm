#!/usr/bin/env node

import { color, label } from '@astrojs/cli-kit'

import {
  getContext,
  pkg,
  prettier,
  eslint,
  lintStaged,
  commitlint,
  husky,
  editorconfig,
  gitignore,
  def
} from './actions'
import { error } from './messages'

async function main() {
  const cleanArgv = process.argv.slice(2).filter((arg) => arg !== '--')
  const ctx = await getContext(cleanArgv)

  console.log(`Welcome to use ${label('create-initer', color.bgGreen, color.black)}`)

  console.log()
  console.log(label('Starting!', color.bgBlue, color.black))
  console.log()

  await pkg(ctx)

  if (ctx.yes) {
    ctx.input = false
    await def(ctx)
  }

  if (ctx.input) {
    const steps = [prettier, eslint, lintStaged, commitlint, husky, editorconfig, gitignore]

    for (const step of steps) {
      await step(ctx)
    }
  }

  console.log()
  console.log(label('Success !', color.bgGreen, color.black))
  console.log()
}

main().catch((e) => {
  error('ERROR', e)
})
