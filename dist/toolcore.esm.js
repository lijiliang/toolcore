/*!
  * toolcore v0.2.3
  * https://github.com/lijiliang/toolcore
  * 
  * Copyright (c) 2019 Benson
  * @license MIT
  */
/*
 * @Author: Benson
 * @Date: 2019-06-05 10:52:26
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-05 14:30:20
 * @Description: 类型判断
 */

/**
 * 判断类型Null
 * @param {any} value 
 */
var isNull = function (value) { return Object.prototype.toString.call(value) == "[object Null]"; };

/**
 * 判断类型Undefined 
 * @param {any} value 
 */
var isUndefined = function (value) { return value === void 0; };

/**
 * 判断类型Boolean
 * @param {any} value 
 */
var isBoolean = function (value) { return typeof(value) === 'boolean'; };

/**
 * 判断类型Number
 * @param {any} value 
 */
var isNumber = function (value) { return typeof(value) === 'number'; };

/**
 * 判断类型String
 * @param {any} value 
 */
var isString = function (value) { return typeof(value) === 'string'; };

/**
 * 判断类型Symbol
 * @param {any} value 
 */
var isSymbol = function (value) { return Object.prototype.toString.call(value) == "[object Symbol]"; };

/**
 * 判断类型Object
 * @param {any} value 
 */
var isObject = function (value) { return Object.prototype.toString.call(value) == "[object Object]"; };

/**
 * 判断类型RegExp
 * @param {any} value 
 */
var isRegExp = function (value){ return Object.prototype.toString.call(value) == "[object RegExp]"; };

/**
 * 判断类型Array
 * @param {any} value 
 */
var isArray = function (value) { return Object.prototype.toString.call(value) == "[object Array]"; };

/**
 * 判断类型Function
 * @param {any} value 
 */
var isFunction = function (value) { return Object.prototype.toString.call(value) == "[object Function]"; };

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
	if(value === void(0) || value === null) { return true }
    else if(isObject(value)) { return !Object.keys(value).length }
    else if(isArray(value)) { return !value.length }
    else if(isString(value)) { return !value }
	else { return value.toString().length == 0 }
};

/*
 * @Author: Benson
 * @Date: 2019-06-05 14:34:55
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-05 14:42:11
 * @Description: 
 */

// private property
var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
* base64 加密 
* @param {string} input 
* @example toolcore.encode('12345')
*/
var encode = function (input) {
  if ( input === void 0 ) input='';

  var output = "";
  var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  var i = 0;
  input = _utf8_encode(input);
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
  return output;
};

/**
* base64 解密
* @param {string} input
* @example toolcore.decode('YWRmc2FmZ3c=')
*/
var decode = function (input) {
  if ( input === void 0 ) input='';

  var output = "";
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
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
  output = _utf8_decode(output);
  return output;
};

// private method for UTF-8 encoding
function _utf8_encode(string) {
  string = string.replace(/\r\n/g,"\n");
  var utftext = "";
  for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);
      if (c < 128) {
          utftext += String.fromCharCode(c);
      } else if((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
      } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
      }

  }
  return utftext;
}

// private method for UTF-8 decoding
function _utf8_decode(utftext) {
  var string = "";
  var i = 0;
  var c = 0;
  var c2 = 0;
  var c3 = 0;
  while ( i < utftext.length ) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
          string += String.fromCharCode(c);
          i++;
      } else if((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i+1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
      } else {
          c2 = utftext.charCodeAt(i+1);
          c3 = utftext.charCodeAt(i+2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
      }
  }
  return string;
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

// import { version } from './package.json'

var version = '0.2.3'; // 版本号

export { isNull, isUndefined, isBoolean, isNumber, isString, isSymbol, isObject, isRegExp, isArray, isFunction, getType, isEmpty, encode, decode, uniqueBy, unique, maxNumBy, minNumBy, maxNum, minNum, shuffle, equal, version };
