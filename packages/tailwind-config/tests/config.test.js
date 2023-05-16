const postcss = require('postcss')

it('tailwindcss presets config', () => {
  /* 编译出来的缩进是 4 空格 */
  const expected = `
.z-\\[1996\\] {
    z-index: 1996
}
.flex {
    display: flex
}
.flex-row-center {
    display: flex;
    justify-content: center;
    align-items: center
}
`
  postcss([
    require('tailwindcss')({
      content: [{ raw: `flex flex-row-center z-[1996]` }],
      presets: [require('../lib/index')],
    }),
  ])
    .process('@tailwind utilities', { from: undefined })
    .then(({ css }) => {
      expect(css).toBe(expected.trim())
    })
})
