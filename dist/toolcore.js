/*!
  * toolcore v1.0.0
  * https://github.com/lijiliang/toolcore
  * 
  * Copyright (c) 2019 Benson
  * @license MIT
  */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.toolcore = {})));
}(this, (function (exports) { 'use strict';

/*
 * @Author: Benson
 * @Date: 2019-06-05 10:52:26
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-06 14:30:20
 * @Description: 类型判断
 */

/**
 * 判断类型Null
 * @param {any} value
 */
var isNull = function (value) { return Object.prototype.toString.call(value) === '[object Null]'; };

/**
 * 判断类型Undefined
 * @param {any} value
 */
var isUndefined = function (value) { return value === void 0; };

/**
 * 判断类型Boolean
 * @param {any} value
 */
var isBoolean = function (value) { return typeof (value) === 'boolean'; };

/**
 * 判断类型Number
 * @param {any} value
 */
var isNumber = function (value) { return typeof (value) === 'number'; };

/**
 * 判断类型String
 * @param {any} value
 */
var isString = function (value) { return typeof (value) === 'string'; };

/**
 * 判断类型Symbol
 * @param {any} value
 */
var isSymbol = function (value) { return Object.prototype.toString.call(value) === '[object Symbol]'; };

/**
 * 判断类型Object
 * @param {any} value
 */
var isObject = function (value) { return Object.prototype.toString.call(value) === '[object Object]'; };

/**
 * 判断类型RegExp
 * @param {any} value
 */
var isRegExp = function (value) { return Object.prototype.toString.call(value) === '[object RegExp]'; };

/**
 * 判断类型Array
 * @param {any} value
 */
var isArray = function (value) { return Object.prototype.toString.call(value) === '[object Array]'; };

/**
 * 判断类型Function
 * @param {any} value
 */
var isFunction = function (value) { return Object.prototype.toString.call(value) === '[object Function]'; };

/**
 * 获取数据类型
 * @param {any} value
 * @example utilscore.getType(null) // => "null"
 */
var getType = function (value) { return Object.prototype.toString.call(value).match(/\s([a-z]+)/i)[1].toLocaleLowerCase(); };

/**
 * 判断元素是否为空
 * @param {any} value
 */
var isEmpty = function (value) {
  if (value === void (0) || value === null) { return true }
  else if (isObject(value)) { return !Object.keys(value).length }
  else if (isArray(value)) { return !value.length }
  else if (isString(value)) { return !value }
  else { return value.toString().length === 0 }
};

/**
 * 判断是否为浏览器
 * @param {any} value
 */
var inBrowser = typeof window !== 'undefined';

/*
 * @Author: Benson
 * @Date: 2019-06-05 14:34:55
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-05 14:42:11
 * @Description:
 */

// private property
var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

/**
* base64 加密
* @param {string} input
* @example toolcore.encode('12345')
*/
var encode = function (input) {
  if ( input === void 0 ) input = '';

  var output = '';
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  input = utf8Encode(input);
  while (i < input.length) {
    chr1 = input.charCodeAt(i++);
    chr2 = input.charCodeAt(i++);
    chr3 = input.charCodeAt(i++);
    enc1 = chr1 >> 2;
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
    enc4 = chr3 & 63;
    if (isNaN(chr2)) {
      enc3 = enc4 = 64;
    } else if (isNaN(chr3)) {
      enc4 = 64;
    }
    output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  }
  return output
};

/**
* base64 解密
* @param {string} input
* @example toolcore.decode('YWRmc2FmZ3c=')
*/
var decode = function (input) {
  if ( input === void 0 ) input = '';

  var output = '';
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\\+\\/\\=]/g, '');
  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++));
    enc2 = _keyStr.indexOf(input.charAt(i++));
    enc3 = _keyStr.indexOf(input.charAt(i++));
    enc4 = _keyStr.indexOf(input.charAt(i++));
    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;
    output = output + String.fromCharCode(chr1);
    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
  }
  output = utf8Decode(output);
  return output
};

// private method for UTF-8 encoding
// eslint-disable-next-line camelcase
function utf8Encode (string) {
  string = string.replace(/\r\n/g, '\n');
  var utftext = '';
  for (var n = 0; n < string.length; n++) {
    var c = string.charCodeAt(n);
    if (c < 128) {
      utftext += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      utftext += String.fromCharCode((c >> 6) | 192);
      utftext += String.fromCharCode((c & 63) | 128);
    } else {
      utftext += String.fromCharCode((c >> 12) | 224);
      utftext += String.fromCharCode(((c >> 6) & 63) | 128);
      utftext += String.fromCharCode((c & 63) | 128);
    }
  }
  return utftext
}

// private method for UTF-8 decoding
function utf8Decode (utftext) {
  var string = '';
  var i = 0;
  var c = 0;
  //   let c1 = 0
  var c2 = 0;
  var c3 = 0;
  while (i < utftext.length) {
    c = utftext.charCodeAt(i);
    if (c < 128) {
      string += String.fromCharCode(c);
      i++;
    } else if ((c > 191) && (c < 224)) {
      c2 = utftext.charCodeAt(i + 1);
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
      i += 2;
    } else {
      c2 = utftext.charCodeAt(i + 1);
      c3 = utftext.charCodeAt(i + 2);
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
      i += 3;
    }
  }
  return string
}

/*
 * @Author: Benson
 * @Date: 2019-06-05 11:25:22
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-05 14:50:41
 * @Description: 数组
 */

/**
 * 根据属性去重数组
 * @param {array} arr 去重的数组
 * @param {string} key 去重的key
 * @example toolcore.uniqueBy([{name:'1111'},{name:'1111'},{name:'222'},{name:'333'}],'name') => [{name:'1111'},{name:'222'},{name:'333'}
 */
var uniqueBy = function (arr, key) {
  return arr.filter(function (element, index, array) { return array.findIndex(function (row) { return row[key] === element[key]; }) === index; })
};

/**
 * 普通数组去重
 * @param {array} arr 去重的数组
 * @example toolcore.unique([1,2,2,3,4,3,4,7]) => [1, 2, 3, 4, 7]
 */
var unique = function (arr) { return arr.filter(function (element, index, array) { return array.indexOf(element) === index; }); };

/**
 * 找出数组中该属性最大值的一列
 * @param {array} arr
 * @param {string} key
 * @example toolcore.maxNumBy([{num:55},{num:541},{num:41}],'num') // => {num: 541}
 */
var maxNumBy = function (arr, key) { return arr.find(function (item) { return item[key] === Math.max.apply(Math, arr.map(function (row) { return row[key]; })); }); };

/**
 * 找出数组中该属性最小值的一列
 * @param {array} arr
 * @param {string} key
 * @example toolcore.minNumBy([{num:55},{num:541},{num:41}],'num') // =>  {num: 41}
 */
var minNumBy = function (arr, key) { return arr.find(function (item) { return item[key] === Math.min.apply(Math, arr.map(function (row) { return row[key]; })); }); };

/**
 * 数组中的最大值
 * @param {array} arr
 * @example toolcore.maxNum([12,3,31,5,3]) // => 31
 */
var maxNum = function (arr) { return Math.max.apply(Math, arr); };

/**
 * 数组中的最小值
 * @param {array} arr
 * @example toolcore.minNum([12,3,31,5,3]) // => 3
 */
var minNum = function (arr) { return Math.min.apply(Math, arr); };

/**
 * 将数组打乱
 * @param {array} arr
 */
var shuffle = function (arr) {
  var assign;

  var i = arr.length;
  while (i) {
    var j = Math.floor(Math.random() * i--);
    (assign = [arr[i], arr[j]], arr[j] = assign[0], arr[i] = assign[1]);
  }
  return arr
};

/**
 *
 * 判断两个数组是否相等
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Boolean}
 */
var equal = function (arr1, arr2) {
  if (arr1 === arr2) { return true }
  if (arr1.length !== arr2.length) { return false }
  for (var i = 0; i < arr1.length; ++i) {
    if (arr1[i] !== arr2[i]) { return false }
  }
  return true
};

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
  this.$d = this.parseConfig(date);
  this.init();
}

FormatTime.prototype = {
  parseConfig: function (config) {
    var reg;
    if (!config) { return new Date() }
    if (config instanceof Date) { return config }
    // eslint-disable-next-line no-cond-assign
    if (reg = String(config).match(/^(\d{4})-?(\d{2})-?(\d{1,2})$/)) {
      // 2018-08-08 or 20180808
      return new Date(reg[1], reg[2] - 1, reg[3])
    }
    return new Date(config) // timestamp
  },

  padStart: function (string, length, pad) {
    if (!string || string.length >= length) { return string }
    return ("" + (Array((length + 1) - string.length).join(pad)) + string)
  },

  init: function () {
    this.$zone = this.$d.getTimezoneOffset() / 60;
    this.$zoneStr = this.padStart(String(this.$zone * -1).replace(/^(.)?(\d)/, '$10$200'), 5, '+');
    this.$y = this.$d.getFullYear();
    this.$M = this.$d.getMonth();
    this.$D = this.$d.getDate();
    this.$W = this.$d.getDay();
    this.$H = this.$d.getHours();
    this.$m = this.$d.getMinutes();
    this.$s = this.$d.getSeconds();
    this.$ms = this.$d.getMilliseconds();
  },
  format: function (formatStr, lang) {
    var this$1 = this;
    if ( formatStr === void 0 ) formatStr = 'YYYY-MM-DD HH:mm:ss';
    if ( lang === void 0 ) lang = 'cn';

    // 周字典
    var weeksEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var weeksCN = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    var weeks = lang === 'en' ? weeksEN : weeksCN;
    // 月字典
    var monthsEN = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var monthsCN = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    var months = lang === 'en' ? monthsEN : monthsCN;

    return formatStr.replace(/Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|m{1,2}|s{1,2}|Z{1,2}/g, function (match) {
      switch (match) {
        case 'YY':
          return String(this$1.$y).slice(-2)
        case 'YYYY':
          return String(this$1.$y)
        case 'M':
          return String(this$1.$M + 1)
        case 'MM':
          return this$1.padStart(String(this$1.$M + 1), 2, '0')
        case 'MMM':
          return months[this$1.$M].slice(0, 3)
        case 'MMMM':
          return months[this$1.$M]
        case 'D':
          return String(this$1.$D)
        case 'DD':
          return this$1.padStart(String(this$1.$D), 2, '0')
        case 'd':
          return String(this$1.$W)
        case 'dddd':
          return weeks[this$1.$W]
        case 'H':
          return String(this$1.$H)
        case 'HH':
          return this$1.padStart(String(this$1.$H), 2, '0')
        case 'm':
          return String(this$1.$m)
        case 'mm':
          return this$1.padStart(String(this$1.$m), 2, '0')
        case 's':
          return String(this$1.$s)
        case 'ss':
          return this$1.padStart(String(this$1.$s), 2, '0')
        case 'Z':
          return ((this$1.$zoneStr.slice(0, -2)) + ":00")
        default: // 'ZZ'
          return this$1.$zoneStr
      }
    })
  }
};

var timejs = function (date) {
  var instance = null;
  return (
    function () {
      if (instance) { return instance }
      return new FormatTime(date)
    }
  )()
};

/**
 * @param  {s} 秒数
 * @return {String} 字符串
 * @example toolcore.formatHMS(3610) // -> 1h0m10s
 */
var formatHMS = function (s) {
  var str = '';
  if (s > 3600 * 24) {
    str = Math.floor(s / 3600 / 24) + 'd' + Math.floor(s / 3600 % 24) + 'h' + Math.floor(s % 3600 / 60) + 'm' + s % 60 + 's';
  } else if (s > 3600) {
    str = Math.floor(s / 3600) + 'h' + Math.floor(s % 3600 / 60) + 'm' + s % 60 + 's';
  } else if (s > 60) {
    str = Math.floor(s / 60) + 'm' + s % 60 + 's';
  } else {
    str = s % 60 + 's';
  }
  return str
};

/**
 * 获取时间戳 (秒)
 * @param {any} value
 */
var unix = function (value) {
  if (value === void 0) { return unix(Date.now()) }
  return Math.floor(new Date(value).getTime() / 1000)
};

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
var debounceStart = function (fn, delay) {
  if ( delay === void 0 ) delay = 3000;

  var timer = null;
  var status = true;
  clearTimeout(timer);
  if (status) {
    status = false;
    fn.call(this, arguments);
  }
  // eslint-disable-next-line no-return-assign
  timer = setTimeout(function () { return status = true; }, delay);
};

/**
 * 函数防抖 (非立即执行版)
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 */
var debounceEnd = function (fn, delay) {
  var timer = null;
  return function () {
    var this$1 = this;

    var args = arguments;
    if (timer) { clearTimeout(timer); }
    timer = setTimeout(function () {
      fn.apply(this$1, args);
    }, delay);
  }
};

/**
 * 函数防抖 (完全版)
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 * @param {boolean} immediate true 表立即执行，false 表非立即执行
 */
var debounce = function (fn, delay, immediate) {
  if ( immediate === void 0 ) immediate = false;

  var timer = null;
  var status = true;
  if (!immediate) {
    return function () {
      var this$1 = this;

      var args = arguments;
      if (timer) { clearTimeout(timer); }
      timer = setTimeout(function () { return fn.apply(this$1, args); }, delay);
    }
  } else {
    return function () {
      clearTimeout(timer);
      if (status) {
        status = false;
        fn.call(this, arguments);
      }
      // eslint-disable-next-line no-return-assign
      timer = setTimeout(function () { return status = true; }, delay);
    }
  }
};

/**
 * 函数节流
 * @param {function} fn 函数
 * @param {number} delay 延迟执行毫秒数
 * e.g.
 * let fnThrottle = toolcore.throttle(fun, delay)
 * document.addEventListener('scroll', fnThrottle)
 */
var throttle = function (fn, delay) {
  var timer = null;
  return function () {
    var this$1 = this;

    var args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        fn.apply(this$1, args);
      }, delay);
    }
  }
};

/*
 * @Author: Benson
 * @Date: 2019-06-05 14:44:28
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-05 14:47:08
 * @Description: 数字及数学计算
 */
/**
 * 返回指定范围内的随机整数。
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @example toolcore.randomNum(5,10) // => 5 || 6 || 7 || 8 || 9 || 10
 */
var randomNum = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

/**
 * 将数字四舍五入到指定的小数位数。
 * @param {number} n 操作的数字
 * @param {number} decimals 精确到几位小数
 * @example toolcore.round(12.555,2) // => 12.56
 */
var round = function (n, decimals) {
  if ( decimals === void 0 ) decimals = 0;

  return Number(((Math.round((n + "e" + decimals))) + "e-" + decimals))
};

/**
 * 返回两个或两个以上数字/数字数组中元素之和。
 * @param  {...any} arr 操作的数组
 * @example toolcore.sum(...[1,2,3,4,5]) // => 15
 */
var sum = function () {
  var arr = [], len = arguments.length;
  while ( len-- ) arr[ len ] = arguments[ len ];

  return [].concat( arr ).reduce(function (acc, val) { return accAdd(acc, val); }, 0);
};

/**
 * 根据函数映射每个元素，然后返回数组的和
 * @param {Array} arr
 * @param {Function} fn
 * @example toolcore.sumBy([{num:1},{num:2},{num:3},{num:4},{num:5}],(row)=>row.num) // => 15
 */
var sumBy = function (arr, fn) { return arr.map(typeof fn === 'function' ? fn : function (val) { return val[fn]; }).reduce(function (acc, val) { return accAdd(acc, val); }, 0); };

/**
 * 将数字转化为千分位格式,可以在数字前面加上符号
 * @param {Number|String} num
 * @param {String} mark
 * @returns {String}
 * @example toolcore.toDecimalMark(12345674654.123,'￥') // => "￥12,345,674,654.123"
 */
var toDecimalMark = function (num, mark) {
  if ( mark === void 0 ) mark = '';

  return num.toLocaleString('en-US').replace(/^/, mark);
};

/**
 * 实现产生n个随机数，并且随机数之和是固定值,简单版
 * @param {number} num 随机数之和，固定值
 * @param {number} len 多少个随机数
 * @example toolcore.getrandom(10, 4) // =>  [0, 2, 6, 2]
 */
var getrandom = function (num, len) {
  var arr = [];
  while (arr.length < len - 1) {
    var Average = Math.ceil(num / (len - arr.length - 1));
    var _num = Math.floor(randomNum(Average * 0.2, Average * 0.8));
    arr.push(_num);
    num = num - _num;
  }
  arr.push(num);
  return shuffle(arr)
};

/*
 * @Description: 公共方法处理js计算科学记数法精度问题
 * https://blog.csdn.net/zuorishu/article/details/83108988
*/
var countDecimals = function (num) {
  var len = 0;
  try {
    num = Number(num);
    var str = num.toString().toUpperCase();
    if (str.split('E').length === 2) { // scientific notation
      var isDecimal = false;
      if (str.split('.').length === 2) {
        str = str.split('.')[1];
        if (parseInt(str.split('E')[0]) !== 0) {
          isDecimal = true;
        }
      }
      var x = str.split('E');
      if (isDecimal) {
        len = x[0].length;
      }
      len -= parseInt(x[1]);
    } else if (str.split('.').length === 2) { // decimal
      if (parseInt(str.split('.')[1]) !== 0) {
        len = str.split('.')[1].length;
      }
    }
  } catch (e) {
    throw e
  } finally {
    if (isNaN(len) || len < 0) {
      len = 0;
    }
  }
  return len
};

var convertToInt = function (num) {
  num = Number(num);
  var newNum = num;
  var times = countDecimals(num);
  var tempNum = num.toString().toUpperCase();
  if (tempNum.split('E').length === 2) {
    newNum = Math.round(num * Math.pow(10, times));
  } else {
    newNum = Number(tempNum.replace('.', ''));
  }
  return newNum
};

var getCorrectResult = function (type, num1, num2, result) {
  var tempResult = 0;
  switch (type) {
    case 'add':
      tempResult = num1 + num2;
      break
    case 'sub':
      tempResult = num1 - num2;
      break
    case 'div':
      tempResult = num1 / num2;
      break
    case 'mul':
      tempResult = num1 * num2;
      break
  }
  if (Math.abs(result - tempResult) > 1) {
    return tempResult
  }
  return result
};

/**
 * 加法运算
 * @param {Number} a
 * @param {Number} b
 * @example toolcore.accAdd(0.3 , 0.6) // => 0.9
 */
var accAdd = function (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var dec1, dec2;
  try { dec1 = countDecimals(num1) + 1; } catch (e) { dec1 = 0; }
  try { dec2 = countDecimals(num2) + 1; } catch (e) { dec2 = 0; }
  var times = Math.pow(10, Math.max(dec1, dec2));
  // let result = (num1 * times + num2 * times) / times;
  var result = (accMul(num1, times) + accMul(num2, times)) / times;
  return getCorrectResult('add', num1, num2, result)
};

/**
 * 减法运算
 * @param {Number} a
 * @param {Number} b
 * @example toolcore.accSub(0.3 , 0.2) // => 0.1
 */
var accSub = function (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var dec1, dec2;
  try { dec1 = countDecimals(num1) + 1; } catch (e) { dec1 = 0; }
  try { dec2 = countDecimals(num2) + 1; } catch (e) { dec2 = 0; }
  var times = Math.pow(10, Math.max(dec1, dec2));
  // let result = Number(((num1 * times - num2 * times) / times);
  var result = Number((accMul(num1, times) - accMul(num2, times)) / times);
  return getCorrectResult('sub', num1, num2, result)
};

/**
 * 乘法运算
 * @param {Number} a
 * @param {Number} b
 * @example toolcore.accMul(0.3 , 1.5) // => 0.45
 */
function accMul (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var times = 0;
  var s1 = num1.toString();
  var s2 = num2.toString();
  try { times += countDecimals(s1); } catch (e) { times = 0; }
  try { times += countDecimals(s2); } catch (e) { times = 0; }
  var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
  return getCorrectResult('mul', num1, num2, result)
}

/**
 * 除法运算
 * @param {Number} a
 * @param {Number} b
 * @example toolcore.accDiv(0.3 , 0.1) // => 3
 */
var accDiv = function (num1, num2) {
  num1 = Number(num1);
  num2 = Number(num2);
  var t1 = 0;
  var t2 = 0;
  try { t1 = countDecimals(num1); } catch (e) { t1 = 0; }
  try { t2 = countDecimals(num2); } catch (e) { t2 = 0; }
  var dec1 = convertToInt(num1);
  var dec2 = convertToInt(num2);
  var result = accMul((dec1 / dec2), Math.pow(10, t2 - t1));
  return getCorrectResult('div', num1, num2, result)
};

/**
 * 深度克隆
 * @param {*} obj
 */
var deepClone = function (obj) {
  if (obj === null) {
    return obj
  }
  if (obj instanceof Array) {
    return obj.map(function (row) { return deepClone(row); })
  }
  if (obj instanceof Object) {
    var ret = {};
    Object.keys(obj).forEach(function (key) {
      if (obj[key] instanceof Date) {
        ret[key] = new Date(obj[key].getTime());
      } else {
        ret[key] = deepClone(obj[key]);
      }
    });
    return ret
  }
  return obj
};

/**
 * 返回按属性(props)和顺序(orders)排序的对象数组。
 * @param {array} arr
 * @param {array} props
 * @param {array} orders 'desc升序' 、 'asc降序'
 * @example const users = [
                { name: 'aaa', age: 48 },
                { name: 'awegawe', age: 36 },
                { name: 'aweaw', age: 40 }
            ];
            toolcore.orderBy(users, ['age'],['asc']) // => [{"name":"awegawe","age":36},{"name":"aweaw","age":40},{"name":"aaa","age":48}]
 */
var orderBy = function (arr, props, orders) {
  return [].concat( arr ).sort(function (a, b) { return props.reduce(function (acc, prop, i) {
      if (acc === 0) {
        var ref = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
        var p1 = ref[0];
        var p2 = ref[1];
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
      }
      return acc
    }, 0); }
  )
};

/**
 * 根据 key 递归查找链带关系
 * @param {sting} leafIdName
 * @param {any} leafId
 * @param {array} nodes 被查找的数组
 * @param {array} path 非必填
 * @param {array} path 非必填
 * @example let arr = [
                    {
                        name:'awefawef',
                        id:111,
                        children:[
                            {
                                name:'2222222aaa',
                                id:222,
                                children:[
                                    {
                                        name:'cccccaaa',
                                        id:333,
                                    }
                                ]
                            }
                        ]
                }
            ]
            toolcore.findPathByLeafId('id',333,arr) // => [{"id":111,"value":"awefawef"},{"id":222,"value":"2222222aaa"}]
 */
var findPathByLeafId = function (leafIdName, leafId, nodes, path) {
  var obj;

  if ( path === void 0 ) path = [];
  for (var i = 0; i < nodes.length; i++) {
    var tmpPath = [].concat( path );
    if (leafId === nodes[i][leafIdName]) {
      return tmpPath
    }

    tmpPath.push(( obj = {}, obj[leafIdName] = nodes[i][leafIdName], obj.value = nodes[i].name, obj));
    if (nodes[i].children) {
      var findResult = findPathByLeafId(leafIdName, leafId, nodes[i].children, tmpPath);
      if (findResult) {
        return findResult
      }
    }
  }
};

/**
 * 对象合并
 * @param {object} a 对象
 * @param {object} b 对象
 * @example var a = {
                a:11,
                o:{
                    b:22
            }
            var b = {
                c:33,
                o:{
                    d:44
                }
            }
            toolcore.merge(a,b)
            // =>
            {"a":11,"o":{"b":22,"d":44},"c":33}
}
 */
var merge = function (a, b) {
  for (var key in b) {
    if (!a.hasOwnProperty(key)) {
      a[key] = b[key];
    } else if (isObject(b[key]) && isObject(a[key])) {
      merge(a[key], b[key]);
    }
  }
  return a
};

/**
 * 根据位置,使用 * 遮蔽字符串
 * @param {string} cc
 * @param {number} num1
 * @param {number} num2
 * @param {string} _mask
 * @example toolcore.mask('12398765432',3,7) // => "123****5432"
 */
var mask = function (cc, num1, num2, _mask) {
  if ( num1 === void 0 ) num1 = 0;
  if ( num2 === void 0 ) num2 = 0;
  if ( _mask === void 0 ) _mask = '*';

  // eslint-disable-next-line no-useless-escape
  var reg = new RegExp(("^(.{" + num1 + "})(.{" + (num2 - num1) + "})(." + (num2 >= cc.length ? '\?' : '\+') + ")$"));
  return cc.replace(reg, function ($0, $1, $2, $3) { return $1 + $2.replace(/./g, _mask) + $3; })
};

/**
 * 从位置左边开始，使用 * 遮蔽字符串
 * @param {string} cc
 * @param {number} num
 * @param {string} _mask
 * @example 用法跟 mask 类似
 */
var maskLeft = function (cc, num, _mask) {
  if ( num === void 0 ) num = 0;
  if ( _mask === void 0 ) _mask = '*';

  return mask(cc, 0, num, _mask);
};

/**
 * 从位置右边开始，使用 * 遮蔽字符串
 * @param {string} cc
 * @param {number} num
 * @param {string} _mask
 * @example 用法跟 mask 类似
 */
var maskRight = function (cc, num, _mask) {
  if ( num === void 0 ) num = 0;
  if ( _mask === void 0 ) _mask = '*';

  var strL = cc.length;
  return mask(cc, num > strL ? 0 : strL - num, strL, _mask)
};

/**
 * 生成一个随机的十六进制颜色代码
 * @example toolcore.randomHexColorCode() // => "#c4aabc"
 */
var randomHexColorCode = function () {
  var n = ((Math.random() * 0xfffff) | 0).toString(16);
  return '#' + (n.length !== 6 ? ((Math.random() * 0xf) | 0).toString(16) + n : n)
};

/**
 * 返回元素出现的次数
 * @param {string} str
 * @param {null|string,array} keys
 * @example 1.不传参,获取全部
              toolcore.getCounts('asawdawf') // => {a: 3, s: 1, w: 2, d: 1, f: 1}
            2.传字符串
              toolcore.getCounts('asasfdfasdasf','asf') // => {asf: 2}
            3.传数组
              toolcore.getCounts('asdfjl;qwoetuqwe*(^&&()_)*_23480*yoij)(ojilA4WE4',['we*(^&&()_)*','asdfjl','_23480','qw'])
              // => {we*(^&&()_)*: 1, asdfjl: 1, _23480: 1, qw: 2}
 */
var getCounts = function (str, keys) {
  if ( keys === void 0 ) keys = null;

  var arr = {};
  var keyMap = [];
  var arrStr = str.split('');

  if (isArray(keys)) { keyMap = unique(keys); }
  else if (isString(keys)) { keyMap = keys.split(' '); }
  else { keyMap = unique(arrStr); }

  keyMap.map(function (key) {
    // 处理包含特殊字符
    // eslint-disable-next-line no-useless-escape
    var reg = new RegExp("\([`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]\)", 'g');
    var _key = key.replace(reg, '\\$1');

    var res = str.match(new RegExp(_key, 'g'));

    arr[key] = res ? (arr[key] = res.length) : 0;
  });

  return arr
};

/**
 * 全局唯一标识符 UUID
 * @param {number} len 长度
 * @param {number} radix 基数 62
 * @example toolcore.uuid(10,62) // => "e424F79HP8"
 */
var uuid = function (len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = []; var i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) { uuid[i] = chars[0 | Math.random() * radix]; }
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('')
};

/**
 * GUID:128位的数字标识符
 * @example toolcore.guid() // => "537a3b5a-5c1b-433d-9814-532efdda6b10"
 */
var guid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0; var v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16)
  })
};

/*
 * @Author: Benson
 * @Date: 2019-06-05 14:45:01
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-12 16:46:19
 * @Description: Url处理
 */
/**
 * 根据对象中的参数匹配插入到url中
 * @param {*} url
 * @param {Object} options
 * @example toolcore.insertUrl('http://www.baidu.com?:name',{name:'ceshi'}) // => http://www.baidu.com?ceshi
 */
var insertUrl = function (url, options) {
  if ( options === void 0 ) options = {};

  return url.replace(/:([a-zA-Z0-9_]{1,})/g, function ($0, $1) {
    var val = encodeURIComponent(options[$1]);
    return val
  })
};

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

var URLSearchParams = function (param) {
  if (isObject(param)) {
    return Object.keys(param).map(function (key) { return (key + "=" + (encodeURIComponent(JSON.stringify(param[key])))); }).join('&')
  } else if (isString(param)) {
    var maps = {};
    // eslint-disable-next-line no-useless-escape
    var _params = param.match(/(([\w%~!*\(\)\-.']+)\=([\w%~!*\(\)\-.']+)?)/ig);
    _params && _params.forEach(function (res) {
      var row = decodeURIComponent(res).split('=');
      try {
        maps[row[0]] = JSON.parse(decodeURIComponent(row[1]));
      } catch (err) {
        try {
          maps[row[0]] = decodeURIComponent(row[1]);
        // eslint-disable-next-line brace-style
        }
        // 特殊字符情况
        catch (err) {
          maps[row[0]] = row[1];
        }
      }
    });
    return maps
  }
};

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
var Url = function (urlString) {
  try {
    // eslint-disable-next-line no-useless-escape
    var ref = /((http:|https:)\/\/(([\w.\-]+)(\:(\d+))?))([\w\/\-]+)?((\?[^#]+)(.+)?)?/ig.exec(urlString);
    var href = ref[0];
    var origin = ref[1];
    var protocol = ref[2];
    var host = ref[3];
    var hostname = ref[4];
    var portName = ref[5];
    var port = ref[6];
    var pathname = ref[7];
    var searchName = ref[8];
    var search = ref[9];
    var hash = ref[10];
    return { href: href, origin: origin, protocol: protocol, host: host, hostname: hostname, portName: portName, port: port, pathname: pathname, searchName: searchName, search: search, hash: hash }
  } catch (err) {
    console.error(("Raises a SYNTAX ERROR exception as 'about:blank/" + urlString + "' is not valid"));
  }
};

var version = '1.0.0'; // 版本号

exports.isNull = isNull;
exports.isUndefined = isUndefined;
exports.isBoolean = isBoolean;
exports.isNumber = isNumber;
exports.isString = isString;
exports.isSymbol = isSymbol;
exports.isObject = isObject;
exports.isRegExp = isRegExp;
exports.isArray = isArray;
exports.isFunction = isFunction;
exports.getType = getType;
exports.isEmpty = isEmpty;
exports.inBrowser = inBrowser;
exports.encode = encode;
exports.decode = decode;
exports.uniqueBy = uniqueBy;
exports.unique = unique;
exports.maxNumBy = maxNumBy;
exports.minNumBy = minNumBy;
exports.maxNum = maxNum;
exports.minNum = minNum;
exports.shuffle = shuffle;
exports.equal = equal;
exports.timejs = timejs;
exports.formatHMS = formatHMS;
exports.unix = unix;
exports.debounceStart = debounceStart;
exports.debounceEnd = debounceEnd;
exports.debounce = debounce;
exports.throttle = throttle;
exports.randomNum = randomNum;
exports.round = round;
exports.sum = sum;
exports.sumBy = sumBy;
exports.toDecimalMark = toDecimalMark;
exports.getrandom = getrandom;
exports.accAdd = accAdd;
exports.accSub = accSub;
exports.accMul = accMul;
exports.accDiv = accDiv;
exports.deepClone = deepClone;
exports.orderBy = orderBy;
exports.findPathByLeafId = findPathByLeafId;
exports.merge = merge;
exports.mask = mask;
exports.maskLeft = maskLeft;
exports.maskRight = maskRight;
exports.randomHexColorCode = randomHexColorCode;
exports.getCounts = getCounts;
exports.uuid = uuid;
exports.guid = guid;
exports.insertUrl = insertUrl;
exports.URLSearchParams = URLSearchParams;
exports.Url = Url;
exports.version = version;

Object.defineProperty(exports, '__esModule', { value: true });

})));
