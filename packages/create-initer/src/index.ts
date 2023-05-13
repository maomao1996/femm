#!/usr/bin/env node

import { color, label } from '@astrojs/cli-kit'

import { getContext, prettier, lintStaged } from './actions'
import { error } from './messages'

async function main() {
  const cleanArgv = process.argv.slice(2).filter((arg) => arg !== '--')
  const ctx = await getContext(cleanArgv)

  console.log(`Welcome to use ${label('create-initer', color.bgGreen, color.black)}`)

  if (ctx.input) {
    const steps = [prettier, lintStaged]

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
