import { version } from './package.json'
import * as obj from './libs/object'
import * as arr from './libs/array'

const toolcore = {
  ...obj,
  ...arr,
  version: '0.1.0'
  // version
}

for(let key in toolcore) {
  exports[key] = toolcore[key]
}