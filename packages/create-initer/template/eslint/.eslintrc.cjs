module.exports = {
  root: true,
  extends: ['<%= eslintConfig %>'<% if (prettier) { %>, 'plugin:prettier/recommended'<% } %>],
}
