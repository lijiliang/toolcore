import { isNull, isUndefined, isBoolean, isNumber, isString, isSymbol, isObject, isRegExp, isArray, isFunction, getType, isEmpty, inBrowser } from './src/types'
import { encode, decode } from './src/base64'
import { uniqueBy, unique, maxNumBy, minNumBy, maxNum, minNum, shuffle, equal } from './src/array'
import { timejs, formatHMS, unix } from './src/date'
import { debounceStart, debounceEnd, debounce, throttle } from './src/function'
import { accSub } from './src/number'

const version = '__VERSION__' // 版本号

export {
  isNull, isUndefined, isBoolean, isNumber, isString, isSymbol, isObject, isRegExp, isArray, isFunction, getType, isEmpty, inBrowser,
  encode, decode,
  uniqueBy, unique, maxNumBy, minNumBy, maxNum, minNum, shuffle, equal,
  timejs, formatHMS, unix,
  debounceStart, debounceEnd, debounce, throttle,
  accSub,
  version
}
