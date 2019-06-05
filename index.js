import { version } from './package.json'
import * as types from './src/types'
import * as obj from './src/object'
import * as arr from './src/array'

const toolcore = {
  ...types,
  ...obj,
  ...arr,
  version: '0.1.0'
  // version
}

for(let key in toolcore) {
  exports[key] = toolcore[key]
}