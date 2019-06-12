/*
 * @Author: Benson
 * @Date: 2019-06-05 14:44:28
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-05 14:47:08
 * @Description: 数字及数学计算
 */

import { shuffle } from './array'
/**
 * 返回指定范围内的随机整数。
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @example toolcore.randomNum(5,10) // => 5 || 6 || 7 || 8 || 9 || 10
 */
export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

/**
 * 将数字四舍五入到指定的小数位数。
 * @param {number} n 操作的数字
 * @param {number} decimals 精确到几位小数
 * @example toolcore.round(12.555,2) // => 12.56
 */
export const round = (n, decimals = 0) => {
  return Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`)
}

/**
 * 返回两个或两个以上数字/数字数组中元素之和。
 * @param  {...any} arr 操作的数组
 * @example toolcore.sum(...[1,2,3,4,5]) // => 15
 */
export const sum = (...arr) => [...arr].reduce((acc, val) => accAdd(acc, val), 0)

/**
 * 根据函数映射每个元素，然后返回数组的和
 * @param {Array} arr
 * @param {Function} fn
 * @example toolcore.sumBy([{num:1},{num:2},{num:3},{num:4},{num:5}],(row)=>row.num) // => 15
 */
export const sumBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => accAdd(acc, val), 0)

/**
 * 将数字转化为千分位格式,可以在数字前面加上符号
 * @param {Number|String} num
 * @param {String} mark
 * @returns {String}
 * @example toolcore.toDecimalMark(12345674654.123,'￥') // => "￥12,345,674,654.123"
 */
export const toDecimalMark = (num, mark = '') => num.toLocaleString('en-US').replace(/^/, mark)

/**
 * 实现产生n个随机数，并且随机数之和是固定值,简单版
 * @param {number} num 随机数之和，固定值
 * @param {number} len 多少个随机数
 * @example toolcore.getrandom(10, 4) // =>  [0, 2, 6, 2]
 */
export const getrandom = (num, len) => {
  var arr = []
  while (arr.length < len - 1) {
    let Average = Math.ceil(num / (len - arr.length - 1))
    let _num = Math.floor(randomNum(Average * 0.2, Average * 0.8))
    arr.push(_num)
    num = num - _num
  }
  arr.push(num)
  return shuffle(arr)
}

/*
 * @Description: 公共方法处理js计算科学记数法精度问题
 * https://blog.csdn.net/zuorishu/article/details/83108988
*/
const countDecimals = function (num) {
  let len = 0
  try {
    num = Number(num)
    let str = num.toString().toUpperCase()
    if (str.split('E').length === 2) { // scientific notation
      let isDecimal = false
      if (str.split('.').length === 2) {
        str = str.split('.')[1]
        if (parseInt(str.split('E')[0]) !== 0) {
          isDecimal = true
        }
      }
      const x = str.split('E')
      if (isDecimal) {
        len = x[0].length
      }
      len -= parseInt(x[1])
    } else if (str.split('.').length === 2) { // decimal
      if (parseInt(str.split('.')[1]) !== 0) {
        len = str.split('.')[1].length
      }
    }
  } catch (e) {
    throw e
  } finally {
    if (isNaN(len) || len < 0) {
      len = 0
    }
  }
  return len
}

const convertToInt = function (num) {
  num = Number(num)
  let newNum = num
  const times = countDecimals(num)
  const tempNum = num.toString().toUpperCase()
  if (tempNum.split('E').length === 2) {
    newNum = Math.round(num * Math.pow(10, times))
  } else {
    newNum = Number(tempNum.replace('.', ''))
  }
  return newNum
}

const getCorrectResult = function (type, num1, num2, result) {
  let tempResult = 0
  switch (type) {
    case 'add':
      tempResult = num1 + num2
      break
    case 'sub':
      tempResult = num1 - num2
      break
    case 'div':
      tempResult = num1 / num2
      break
    case 'mul':
      tempResult = num1 * num2
      break
  }
  if (Math.abs(result - tempResult) > 1) {
    return tempResult
  }
  return result
}

/**
 * 加法运算
 * @param {Number} a
 * @param {Number} b
 * @example toolcore.accAdd(0.3 , 0.6) // => 0.9
 */
export const accAdd = (num1, num2) => {
  num1 = Number(num1)
  num2 = Number(num2)
  let dec1, dec2
  try { dec1 = countDecimals(num1) + 1 } catch (e) { dec1 = 0 }
  try { dec2 = countDecimals(num2) + 1 } catch (e) { dec2 = 0 }
  const times = Math.pow(10, Math.max(dec1, dec2))
  // let result = (num1 * times + num2 * times) / times;
  const result = (accMul(num1, times) + accMul(num2, times)) / times
  return getCorrectResult('add', num1, num2, result)
}

/**
 * 减法运算
 * @param {Number} a
 * @param {Number} b
 * @example toolcore.accSub(0.3 , 0.2) // => 0.1
 */
export const accSub = (num1, num2) => {
  num1 = Number(num1)
  num2 = Number(num2)
  let dec1, dec2
  try { dec1 = countDecimals(num1) + 1 } catch (e) { dec1 = 0 }
  try { dec2 = countDecimals(num2) + 1 } catch (e) { dec2 = 0 }
  const times = Math.pow(10, Math.max(dec1, dec2))
  // let result = Number(((num1 * times - num2 * times) / times);
  const result = Number((accMul(num1, times) - accMul(num2, times)) / times)
  return getCorrectResult('sub', num1, num2, result)
}

/**
 * 乘法运算
 * @param {Number} a
 * @param {Number} b
 * @example toolcore.accMul(0.3 , 1.5) // => 0.45
 */
export function accMul (num1, num2) {
  num1 = Number(num1)
  num2 = Number(num2)
  let times = 0
  const s1 = num1.toString()
  const s2 = num2.toString()
  try { times += countDecimals(s1) } catch (e) { times = 0 }
  try { times += countDecimals(s2) } catch (e) { times = 0 }
  const result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times)
  return getCorrectResult('mul', num1, num2, result)
}

/**
 * 除法运算
 * @param {Number} a
 * @param {Number} b
 * @example toolcore.accDiv(0.3 , 0.1) // => 3
 */
export const accDiv = (num1, num2) => {
  num1 = Number(num1)
  num2 = Number(num2)
  let t1 = 0
  let t2 = 0
  try { t1 = countDecimals(num1) } catch (e) { t1 = 0 }
  try { t2 = countDecimals(num2) } catch (e) { t2 = 0 }
  const dec1 = convertToInt(num1)
  const dec2 = convertToInt(num2)
  const result = accMul((dec1 / dec2), Math.pow(10, t2 - t1))
  return getCorrectResult('div', num1, num2, result)
}
