#!/usr/bin/env node

import { color, label } from '@astrojs/cli-kit'

import {
  getContext,
  pkg,
  prettier,
  lintStaged,
  commitlint,
  husky,
  editorconfig,
  gitignore
} from './actions'
import { error } from './messages'

async function main() {
  const cleanArgv = process.argv.slice(2).filter((arg) => arg !== '--')
  const ctx = await getContext(cleanArgv)

  console.log(`Welcome to use ${label('create-initer', color.bgGreen, color.black)}`)

  await pkg(ctx)

  if (ctx.input) {
    const steps = [prettier, lintStaged, commitlint, husky, editorconfig, gitignore]

    for (const step of steps) {
      await step(ctx)
    }
  }

  console.log('\n')
  console.log(label('Success !', color.bgGreen, color.black))
}

main().catch((e) => {
  error('ERROR', e)
})
