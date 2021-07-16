const execa = require('execa')
const fs = require('fs')

// 目录
const targets = fs
  .readdirSync('packages')
  .filter(file => {
    if (file === 'interface') {
      return false
    }
    return fs.statSync('./packages/' + file).isDirectory || file === 'interface'
  })

async function buildFn(target) {
  await execa('rollup', ['-w', '-c', 'rollup.config.js', '--environment', `TARGET:${target}`], { stdio: 'inherit' })
}

function runParallel(targets) {
  const res = []
  for (const item of targets) {
    const p = buildFn(item)
    res.push(p)
  }
  return Promise.all(res)
}

runParallel(targets)
