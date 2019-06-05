import { version } from './package.json'
import * as types from './src/types'
import * as base64 from './src/base64'
import * as array from './src/array'
import * as date from './src/date'
import * as fn from './src/function'
import * as number from './src/number'
import * as object from './src/object'
import * as other from './src/other'
import * as prototype from './src/prototype'
import * as string from './src/string'
import * as url from './src/url'
import * as validator from './src/validator'


const toolcore = {
  ...types,
  ...base64,
  ...array,
  ...date,
  ...fn,
  ...number,
  ...object,
  ...other,
  ...prototype,
  ...string,
  ...url,
  ...validator,
  version: '0.1.0'
  // version
}

for(let key in toolcore) {
  exports[key] = toolcore[key]
}