const plugin = require('tailwindcss/plugin')

const flexCenterBaseStyles = {
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center'
}

const flexCenter = plugin(function ({ addUtilities }) {
  addUtilities({
    '.flex-row-center': flexCenterBaseStyles,
    '.flex-col-center': { ...flexCenterBaseStyles, 'flex-direction': 'column' }
  })
})

module.exports = flexCenter
