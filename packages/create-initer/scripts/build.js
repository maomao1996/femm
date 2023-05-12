import { build } from 'esbuild'

build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.cjs',
  format: 'cjs',
  platform: 'node',
  target: 'node12'
})
