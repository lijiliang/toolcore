// import { version } from './package.json'
// import * as type from './src/types'
// import * as base64 from './src/base64'
// import * as array from './src/array'
// export const inBrowser = typeof window !== 'undefined'

// let toolcore = Object.assign({}, 
//   type,
//   base64,
//   array,
// )

// const toolcore = {
//   ...type,
//   ...base64,
//   ...array,
//   version: '0.1.0'
//   // version
// }
// console.log(toolcore)
// for(let key in toolcore){
//   console.log( module.exports[key], toolcore[key])
//   module.exports[key] = toolcore[key]
// }
// if (inBrowser) {
//   window.toolcore = toolcore
// }

// module.exports = toolcore

import { encode, decode } from './src/base64'

export {
  encode, 
  decode
}