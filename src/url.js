/*
 * @Author: Benson
 * @Date: 2019-06-05 14:45:01
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-12 16:46:19
 * @Description: Url处理
 */
import { isObject, isString } from './types'
/**
 * 根据对象中的参数匹配插入到url中
 * @param {*} url
 * @param {Object} options
 * @example toolcore.insertUrl('http://www.baidu.com?:name',{name:'ceshi'}) // => http://www.baidu.com?ceshi
 */
export const insertUrl = (url, options = {}) => {
  return url.replace(/:([a-zA-Z0-9_]{1,})/g, ($0, $1) => {
    let val = encodeURIComponent(options[$1])
    if (val === undefined) {
      // eslint-disable-next-line no-new
      new Error(`URL ${url} not find ${$1}`)
    }
    return val
  })
}

/**
 * url 序列化和反序列化
 * @param {Object|String} param
 * @example toolcore.URLSearchParams('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=parseQueryString&rsv_pq=8c7a6d0000146171&rsv_t=43d6RzTiyjUjUKtQtqfR3XL25JepKFwJYvvSpsj%2BJ7aFqxdBLDungY%2Bfx%2BE&rqlang=cn&rsv_enter=1&rsv_n=2&rsv_sug3=1')
            // =>
            {
                "ie":"utf-8",
                "f":"8",
                "rsv_bp":"1",
                "rsv_idx":"1",
                "tn":"baidu",
                "wd":"parseQueryString",
                "rsv_pq":"8c7a6d0000146171",
                "rsv_t":"43d6RzTiyjUjUKtQtqfR3XL25JepKFwJYvvSpsj+J7aFqxdBLDungY+fx+E",
                "rqlang":"cn",
                "rsv_enter":"1",
                "rsv_n":"2",
                "rsv_sug3":"1"
            }
            toolcore.URLSearchParams({
                name:'cgx',
                test:'ceshi'
            })
            // => "name=cgx&test=ceshi"
 */

export const URLSearchParams = (param) => {
  if (isObject(param)) {
    return Object.keys(param).map(key => `${key}=${encodeURIComponent(JSON.stringify(param[key]))}`).join('&')
  } else if (isString(param)) {
    let maps = {}
    // eslint-disable-next-line no-useless-escape
    let _params = param.match(/(([\w%~!*\(\)\-.']+)\=([\w%~!*\(\)\-.']+)?)/ig)
    _params && _params.forEach(res => {
      let row = decodeURIComponent(res).split('=')
      try {
        maps[row[0]] = JSON.parse(decodeURIComponent(row[1]))
      } catch (err) {
        try {
          maps[row[0]] = decodeURIComponent(row[1])
        // eslint-disable-next-line brace-style
        }
        // 特殊字符情况
        catch (err) {
          maps[row[0]] = row[1]
        }
      }
    })
    return maps
  }
}

/**
 * 返回网址的相关信息，模拟了 浏览器的 new URL(urlString) 部分功能
 * @param {string} urlString url网址
 * @returns {object}
 * @example toolcore.Url('https://localhost:3000/translate?aldtype=16047&query=&keyfrom=baidu&smartresult=dict&lang=auto2zh#zh/en/%E7%AB%AF%E5%8F%A3')
                // =>
                // {
                //     hash: "#zh/en/%E7%AB%AF%E5%8F%A3",
                //     host: "localhost:3000",
                //     hostname: "localhost",
                //     href: "https://localhost:3000/translate?aldtype=16047&query=&keyfrom=baidu&smartresult=dict&lang=auto2zh#zh/en/%E7%AB%AF%E5%8F%A3",
                //     origin: "https://localhost:3000",
                //     pathname: "/translate",
                //     port: "3000",
                //     protocol: "https:",
                //     search: "?aldtype=16047&query=&keyfrom=baidu&smartresult=dict&lang=auto2zh"
                // }
 */
export const Url = (urlString) => {
  try {
    // eslint-disable-next-line no-useless-escape
    let [ href, origin, protocol, host, hostname, portName, port, pathname, searchName, search, hash ] = /((http:|https:)\/\/(([\w.\-]+)(\:(\d+))?))([\w\/\-]+)?((\?[^#]+)(.+)?)?/ig.exec(urlString)
    return { href, origin, protocol, host, hostname, portName, port, pathname, searchName, search, hash }
  } catch (err) {
    console.error(`Raises a SYNTAX ERROR exception as 'about:blank/${urlString}' is not valid`)
  }
}
