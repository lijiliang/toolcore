/*
 * @Author: Benson
 * @Date: 2019-06-05 14:44:07
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-05 14:48:14
 * @Description: 日期
 */

/**
 * 日期格式化
 *
 * @param {Date | Null} date 要格式化的日期
 *
 * @param {Pattern} 格式化类型支持：
 * YY-MM-DD ==> 19-06-06
 * YYYY-MM-DD ==> 2019-06-06
 * YYYY-MM-DD HH:mm ==> 2019-06-06 15:30
 * YYYY-MM-DD HH:mm:ss ==> 2019-06-06 15:30:11 (默认类型)
 * YYYY-M-D H:m:s ==> 2019-6-6 8:8:8
 * MMMM 月份
 * dddd 星期
 *
 * @params {String} lang(cn | en 中 | 英)
 *
 * @return {Date} 格式化后的日期
 *
 * e.g.
 * let f = toolcore.timejs().format(Pattern, lang)
 * toolcore.Timejs().format('YYYY-MM-DD HH:mm:ss')  -> 2019-06-06 16:26:04
 * toolcore.Timejs(new Date()).format('YYYY-MM-DD HH:mm:ss dddd', 'cn')
 * toolcore.Timejs(1559898352000).format('YYYY-MM-DD HH:mm:ss', 'en')
 */

function FormatTime (date) {
  this.$d = this.parseConfig(date)
  this.init()
}

FormatTime.prototype = {
  parseConfig: function (config) {
    let reg
    if (!config) return new Date()
    if (config instanceof Date) return config
    // eslint-disable-next-line no-cond-assign
    if (reg = String(config).match(/^(\d{4})-?(\d{2})-?(\d{1,2})$/)) {
      // 2018-08-08 or 20180808
      return new Date(reg[1], reg[2] - 1, reg[3])
    }
    return new Date(config) // timestamp
  },

  padStart: function (string, length, pad) {
    if (!string || string.length >= length) return string
    return `${Array((length + 1) - string.length).join(pad)}${string}`
  },

  init: function () {
    this.$zone = this.$d.getTimezoneOffset() / 60
    this.$zoneStr = this.padStart(String(this.$zone * -1).replace(/^(.)?(\d)/, '$10$200'), 5, '+')
    this.$y = this.$d.getFullYear()
    this.$M = this.$d.getMonth()
    this.$D = this.$d.getDate()
    this.$W = this.$d.getDay()
    this.$H = this.$d.getHours()
    this.$m = this.$d.getMinutes()
    this.$s = this.$d.getSeconds()
    this.$ms = this.$d.getMilliseconds()
  },
  format: function (formatStr = 'YYYY-MM-DD HH:mm:ss', lang = 'cn') {
    // 周字典
    const weeksEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const weeksCN = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    const weeks = lang === 'en' ? weeksEN : weeksCN
    // 月字典
    const monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const monthsCN = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    const months = lang === 'en' ? monthsEN : monthsCN

    return formatStr.replace(/Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,2}|Z{1,2}/g, (match) => {
      switch (match) {
        case 'YY':
          return String(this.$y).slice(-2)
        case 'YYYY':
          return String(this.$y)
        case 'M':
          return String(this.$M + 1)
        case 'MM':
          return this.padStart(String(this.$M + 1), 2, '0')
        case 'MMM':
          return months[this.$M].slice(0, 3)
        case 'MMMM':
          return months[this.$M]
        case 'D':
          return String(this.$D)
        case 'DD':
          return this.padStart(String(this.$D), 2, '0')
        case 'd':
          return String(this.$W)
        case 'dddd':
          return weeks[this.$W]
        case 'H':
          return String(this.$H)
        case 'HH':
          return this.padStart(String(this.$H), 2, '0')
        case 'm':
          return String(this.$m)
        case 'mm':
          return this.padStart(String(this.$m), 2, '0')
        case 's':
          return String(this.$s)
        case 'ss':
          return this.padStart(String(this.$s), 2, '0')
        case 'Z':
          return `${this.$zoneStr.slice(0, -2)}:00`
        default: // 'ZZ'
          return this.$zoneStr
      }
    })
  }
}

export const timejs = (date) => {
  let instance = null
  return (
    () => {
      if (instance) return instance
      return new FormatTime(date)
    }
  )()
}

/**
 * @param  {s} 秒数
 * @return {String} 字符串
 * @example toolcore.formatHMS(3610) // -> 1h0m10s
 */
export const formatHMS = (s) => {
  var str = ''
  if (s > 3600 * 24) {
    str = Math.floor(s / 3600 / 24) + 'd' + Math.floor(s / 3600 % 24) + 'h' + Math.floor(s % 3600 / 60) + 'm' + s % 60 + 's'
  } else if (s > 3600) {
    str = Math.floor(s / 3600) + 'h' + Math.floor(s % 3600 / 60) + 'm' + s % 60 + 's'
  } else if (s > 60) {
    str = Math.floor(s / 60) + 'm' + s % 60 + 's'
  } else {
    str = s % 60 + 's'
  }
  return str
}

/**
 * 获取时间戳 (秒)
 * @param {any} value
 */
export const unix = (value) => {
  if (value === void 0) return unix(Date.now())
  return Math.floor(new Date(value).getTime() / 1000)
}

/**
 * 格式化时间
 * @param {any} value
 * @param {String} format
 * @example toolcore.formatTime('2019/06/04 12:45:32','YYYY~MM~DD hh~mm~ss 星期W  季度Q') // => "2019~06~04 12~45~32 星期二  季度2"
 */
// export const formatTime = (value, format) => {
//   let nowDate = new Date(value)
//   let weeks = ['日', '一', '二', '三', '四', '五', '六']
//   let time = (new Date(+nowDate + 8 * 3600 * 1000)).toISOString().substr(0, 19).replace(/[a-z]/i, ' ')
//   let [_, YYYY, MM, DD, hh, mm, ss] = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/g.exec(time)
//   var filterTime = (type, _) => type.slice(0, _.length)
//   return format.replace(/(Y{1,4})/g, ($1) => filterTime(YYYY, $1))
//     .replace(/(M{1,2})/g, ($1) => filterTime(MM, $1))
//     .replace(/(D{1,2})/g, ($1) => filterTime(DD, $1))
//     .replace(/(h{1,2})/g, ($1) => filterTime(hh, $1))
//     .replace(/(m{1,2})/g, ($1) => filterTime(mm, $1))
//     .replace(/(s{1,2})/g, ($1) => filterTime(ss, $1))
//     .replace(/(W{1})/g, ($1) => weeks[nowDate.getDay()])
//     .replace(/(Q{1})/g, ($1) => Math.floor((nowDate.getMonth() + 3) / 3))
// }
