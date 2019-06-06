/*
 * @Author: Benson
 * @Date: 2019-06-05 14:44:20
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-06 17:47:24
 * @Description: 函数
 */

/**
 * 函数防抖 (立即执行版)
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 */
export const debounceStart = function (fn, delay = 3000) {
  let timer = null
  let status = true
  clearTimeout(timer)
  if (status) {
    status = false
    fn.call(this, arguments)
  }
  // eslint-disable-next-line no-return-assign
  timer = setTimeout(() => status = true, delay)
}

/**
 * 函数防抖 (非立即执行版)
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 */
export const debounceEnd = (fn, delay) => {
  let timer = null
  return function () {
    let args = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * 函数防抖 (完全版)
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 * @param {boolean} immediate true 表立即执行，false 表非立即执行
 */
export const debounce = (fn, delay, immediate = false) => {
  let timer = null
  let status = true
  if (!immediate) {
    return function () {
      let args = arguments
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => fn.apply(this, args), delay)
    }
  } else {
    return function () {
      clearTimeout(timer)
      if (status) {
        status = false
        fn.call(this, arguments)
      }
      // eslint-disable-next-line no-return-assign
      timer = setTimeout(() => status = true, delay)
    }
  }
}

/**
 * 函数节流
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 * e.g.
 * let fnThrottle = toolcore.throttle(fun, delay)
 * document.addEventListener('scroll', fnThrottle)
 */
export const throttle = (fn, delay) => {
  let timer = null
  return function () {
    let args = arguments
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, delay)
    }
  }
}
