// import { version } from './package.json'
import * as type from './src/types'
import * as base64 from './src/base64'
import * as array from './src/array'

let toolcore = Object.assign({}, 
  ...type,
  ...base64,
  ...array,
)
// {
//   ...type,
//   ...base64,
//   ...array,
//   version: '0.1.0'
//   // version
// }

for(let key in toolcore){
  exports[key] = toolcore[key]
}