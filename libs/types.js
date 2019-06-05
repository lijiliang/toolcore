/*
 * @Author: Benson
 * @Date: 2019-06-05 10:52:26
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-05 10:53:11
 * @Description: 各种类型工具
 */

/**
 * 判断类型Null
 * @param {any} value 
 */
export const isNull = value => Object.prototype.toString.call(value) == "[object Null]"