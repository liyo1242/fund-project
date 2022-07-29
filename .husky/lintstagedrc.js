module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.{scss,less,styl,html}': ['prettier --write'],
  '*.md': ['prettier --write'],
}
