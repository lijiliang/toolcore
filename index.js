import { isNull, isUndefined, isBoolean, isNumber, isString, isSymbol, isObject, isRegExp, isArray, isFunction, getType, isEmpty, inBrowser } from './src/types'
import { encode, decode } from './src/base64'
import { uniqueBy, unique, maxNumBy, minNumBy, maxNum, minNum, shuffle, equal } from './src/array'
import { timejs, formatHMS, unix } from './src/date'
import { debounceStart, debounceEnd, debounce, throttle } from './src/function'
import { randomNum, round, sum, sumBy, toDecimalMark, getrandom, accAdd, accSub, accMul, accDiv } from './src/number'
import { deepClone, orderBy, findPathByLeafId, merge } from './src/object'
import { mask, maskLeft, maskRight, randomHexColorCode, getCounts, uuid, guid } from './src/string'
import { insertUrl, URLSearchParams, Url } from './src/url'

const version = '__VERSION__' // 版本号

export {
  isNull, isUndefined, isBoolean, isNumber, isString, isSymbol, isObject, isRegExp, isArray, isFunction, getType, isEmpty, inBrowser,
  encode, decode,
  uniqueBy, unique, maxNumBy, minNumBy, maxNum, minNum, shuffle, equal,
  timejs, formatHMS, unix,
  debounceStart, debounceEnd, debounce, throttle,
  randomNum, round, sum, sumBy, toDecimalMark, getrandom, accAdd, accSub, accMul, accDiv,
  deepClone, orderBy, findPathByLeafId, merge,
  mask, maskLeft, maskRight, randomHexColorCode, getCounts, uuid, guid,
  insertUrl, URLSearchParams, Url,
  version
}
