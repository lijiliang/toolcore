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
const isNull = value => Object.prototype.toString.call(value) == "[object Null]";

/**
 * 判断类型Undefined 
 * @param {any} value 
 */
const isUndefined = value => value === void 0;

/**
 * 判断类型Boolean
 * @param {any} value 
 */
const isBoolean = value => typeof(value) === 'boolean';

/**
 * 判断类型Number
 * @param {any} value 
 */
const isNumber = value => typeof(value) === 'number';

/**
 * 判断类型String
 * @param {any} value 
 */
const isString = value => typeof(value) === 'string';

/**
 * 判断类型Symbol
 * @param {any} value 
 */
const isSymbol = value => Object.prototype.toString.call(value) == "[object Symbol]";

/**
 * 判断类型Object
 * @param {any} value 
 */
const isObject = value => Object.prototype.toString.call(value) == "[object Object]";

/**
 * 判断类型RegExp
 * @param {any} value 
 */
const isRegExp = value=> Object.prototype.toString.call(value) == "[object RegExp]";

/**
 * 判断类型Array
 * @param {any} value 
 */
const isArray = value => Object.prototype.toString.call(value) == "[object Array]";

/**
 * 判断类型Function
 * @param {any} value 
 */
const isFunction = value => Object.prototype.toString.call(value) == "[object Function]";

/**
 * 获取数据类型
 * @param {any} value
 * @example utilscore.getType(null) // => "null"
 */
const getType = (value) => Object.prototype.toString.call(value).match(/\s([a-z]+)/i)[1].toLocaleLowerCase();

/**
 * 判断元素是否为空
 * @param {any} value 
 */
const isEmpty = (value) => {
	if(value === void(0) || value === null) return true
    else if(isObject(value)) return !Object.keys(value).length
    else if(isArray(value)) return !value.length
    else if(isString(value)) return !value
	else return value.toString().length == 0
};

/*
 * @Author: Benson
 * @Date: 2019-06-05 14:34:55
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-05 14:42:11
 * @Description: 
 */

// private property
const _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

/**
* base64 加密 
* @param {string} input 
* @example toolcore.encode('12345')
*/
const encode = (input='') => {
  let output = "";
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  let i = 0;
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
const decode = (input='') => {
  let output = "";
  let chr1, chr2, chr3;
  let enc1, enc2, enc3, enc4;
  let i = 0;
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
  let utftext = "";
  for (let n = 0; n < string.length; n++) {
      let c = string.charCodeAt(n);
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
  let string = "";
  let i = 0;
  let c = 0;
  let c2 = 0;
  let c3 = 0;
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
const uniqueBy = function (arr, key) {
  return arr.filter((element, index, array) => array.findIndex(row => row[key] === element[key]) === index)
};

/**
 * 普通数组去重
 * @param {array} arr 去重的数组
 * @example toolcore.unique([1,2,2,3,4,3,4,7]) => [1, 2, 3, 4, 7]
 */
const unique = (arr) =>
    arr.filter((element, index, array) => array.indexOf(element) === index);

/**
 * 找出数组中该属性最大值的一列
 * @param {array} arr 
 * @param {string} key 
 * @example toolcore.maxNumBy([{num:55},{num:541},{num:41}],'num') // => {num: 541}
 */
const maxNumBy = (arr, key) =>
    arr.find(item => item[key] === Math.max.apply(Math, arr.map(row => row[key])));

/**
 * 找出数组中该属性最小值的一列
 * @param {array} arr 
 * @param {string} key 
 * @example toolcore.minNumBy([{num:55},{num:541},{num:41}],'num') // =>  {num: 41}
 */
const minNumBy = (arr, key) =>
    arr.find(item => item[key] === Math.min.apply(Math, arr.map(row => row[key])));

/**
 * 数组中的最大值
 * @param {array} arr
 * @example toolcore.maxNum([12,3,31,5,3]) // => 31 
 */
const maxNum = (arr) =>
    Math.max.apply(Math, arr);

/**
 * 数组中的最小值
 * @param {array} arr 
 * @example toolcore.minNum([12,3,31,5,3]) // => 3 
 */
const minNum = (arr) =>
    Math.min.apply(Math, arr);

/**
 * 将数组打乱
 * @param {array} arr 
 */
const shuffle = (arr) => {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
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
const equal = (arr1, arr2) => {
  if (arr1 === arr2) return true
  if (arr1.length !== arr2.length) return false
  for (let i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) return false
  }
  return true
};

// import { version } from './package.json'

const version = '0.2.3'; // 版本号

export { isNull, isUndefined, isBoolean, isNumber, isString, isSymbol, isObject, isRegExp, isArray, isFunction, getType, isEmpty, encode, decode, uniqueBy, unique, maxNumBy, minNumBy, maxNum, minNum, shuffle, equal, version };
