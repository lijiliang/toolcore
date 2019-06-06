const path = require('path')
const buble = require('rollup-plugin-buble')
const flow = require('rollup-plugin-flow-no-whitespace')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const version = process.env.VERSION || require('../package.json').version

const banner =
`/*!
  * toolcore v${version}
  * https://github.com/lijiliang/toolcore
  * 
  * Copyright (c) ${new Date().getFullYear()} Benson
  * @license MIT
  */`
const resolve = _path => path.resolve(__dirname, '../', _path)

module.exports = [
  // browser dev
  {
    file: resolve('dist/toolcore.js'),
    format: 'umd',
    env: 'development'
  },
  {
    file: resolve('dist/toolcore.min.js'),
    format: 'umd',
    env: 'production'
  },
  {
    file: resolve('dist/toolcore.common.js'),
    format: 'cjs'
  },
  {
    file: resolve('dist/toolcore.esm.js'),
    format: 'es'
  },
  {
    file: resolve('dist/toolcore.esm.browser.js'),
    format: 'es',
    env: 'development',
    transpile: false
  },
  {
    file: resolve('dist/toolcore.esm.browser.min.js'),
    format: 'es',
    env: 'production',
    transpile: false
  }
].map(genConfig)

function genConfig (opts) {
  const config = {
    input: {
      input: resolve('index.js'),
      plugins: [
        flow(),
        node(),
        cjs(),
        replace({
          __VERSION__: version
        })
      ]
    },
    output: {
      file: opts.file,
      format: opts.format,
      banner,
      name: 'toolcore'
    }
  }

  if (opts.env) {
    config.input.plugins.unshift(replace({
      'process.env.NODE_ENV': JSON.stringify(opts.env)
    }))
  }

  if (opts.transpile !== false) {
    config.input.plugins.push(buble())
  }

  return config
}
