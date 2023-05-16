const postcss = require('postcss')

it('tailwindcss plugins flex-center', () => {
  /* 编译出来的缩进是 4 空格 */
  const expected = `
.flex-row-center {
    display: flex;
    justify-content: center;
    align-items: center
}
.flex-col-center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column
}
`
  postcss([
    require('tailwindcss')({
      content: [{ raw: 'flex-row-center flex-col-center' }],
      plugins: [require('../lib/plugins/flex-center')],
    }),
  ])
    .process('@tailwind utilities', { from: undefined })
    .then(({ css }) => {
      expect(css).toBe(expected.trim())
    })
})
