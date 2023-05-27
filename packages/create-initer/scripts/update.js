import { resolve } from 'node:path'
import { globby } from 'globby'
import ncu from 'npm-check-updates'
import { color } from '@astrojs/cli-kit'

async function updateDependencies() {
  try {
    const files = await globby(['template/**/package.json', '!**/(node_modules|eslint)/**'])

    await Promise.all(
      files.map(async (file) => {
        const packageJsonPath = resolve(process.cwd(), file)
        const upgraded = await ncu.run({
          packageFile: packageJsonPath,
          target: 'minor',
          upgrade: true,
        })
        console.log(`${file}:`, upgraded)
      }),
    )

    console.log(color.green('All dependencies updated successfully!'))
  } catch (error) {
    console.error(color.red('Error occurred while updating dependencies:', error))
  }
}

updateDependencies()
