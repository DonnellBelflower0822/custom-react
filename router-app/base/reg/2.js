const { pathToRegexp } = require('path-to-regexp')

const regexp = pathToRegexp('/home', [], {})
console.log(regexp)