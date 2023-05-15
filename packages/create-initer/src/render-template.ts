import * as path from 'node:path'
import fs from 'fs-extra'
import template from 'lodash.template'

import { deepMerge } from './utils/deep-merge'
import { sortDependencies } from './utils/sort-dependencies'

export function renderTemplate(templateName: string, templateData?: Record<string, unknown>) {
  const cwd = process.cwd()
  const templateRoot = path.resolve(__dirname, '../template')
  const templatePath = path.resolve(templateRoot, templateName)
  const files = fs.readdirSync(templatePath)

  for (const file of files) {
    let filePath = path.resolve(cwd, file)
    const templateFilePath = path.resolve(templatePath, file)

    if (file === 'package.json') {
      const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      const newPackage = fs.readFileSync(templateFilePath, 'utf8')
      const pkg = sortDependencies(
        deepMerge(
          existing,
          JSON.parse(templateData ? template(newPackage)(templateData) : newPackage)
        )
      )
      fs.writeFileSync(filePath, `${JSON.stringify(pkg, null, 2)}\n`)
      continue
    }

    if (file.startsWith('_')) {
      // rename `_file` to `.file`
      filePath = path.resolve(path.dirname(filePath), file.replace(/^_/, '.'))
    }

    if (templateData) {
      const compiled = template(fs.readFileSync(templateFilePath, 'utf-8'))(templateData)
      fs.outputFileSync(filePath, compiled)
    } else {
      fs.copyFileSync(templateFilePath, filePath)
    }
  }
}
