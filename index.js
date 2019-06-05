import { version } from './package.json'

const toolcore = {
  version: version
}

for(let key in toolcore) {
  exports[key] = toolcore[key]
}