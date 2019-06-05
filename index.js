import { version } from './package.json'
import * as types from './src/types'
import * as base64 from './src/base64'
import * as obj from './src/object'
import * as arr from './src/array'

const toolcore = {
  ...types,
  ...base64,
  ...obj,
  ...arr,
  version: '0.1.0'
  // version
}

for(let key in toolcore) {
  exports[key] = toolcore[key]
}