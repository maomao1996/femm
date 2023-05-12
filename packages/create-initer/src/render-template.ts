import * as fs from 'node:fs'
import * as path from 'node:path'

import { deepMerge } from './utils/deep-merge'
import { sortDependencies } from './utils/sort-dependencies'

export function renderTemplate(templateName: string) {
  const cwd = process.cwd()
  const templateRoot = path.resolve(__dirname, '../template')
  const templatePath = path.resolve(templateRoot, templateName)
  const files = fs.readdirSync(templatePath)

  for (const file of files) {
    const filePath = path.resolve(cwd, file)
    const templateFilePath = path.resolve(templatePath, file)

    if (file === 'package.json') {
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      const newPackage = JSON.parse(fs.readFileSync(templateFilePath, 'utf8'))
      const pkg = sortDependencies(deepMerge(existing, newPackage))
      fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n')
      continue
    }

    fs.copyFileSync(templateFilePath, filePath)
  }
}
