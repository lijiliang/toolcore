/*
 * @Author: Benson
 * @Date: 2019-06-05 11:25:22
 * @LastEditors: Benson
 * @LastEditTime: 2019-06-05 12:05:39
 * @Description: 数组
 */


/**
 * 根据属性去重数组
 * @param {array} arr 去重的数组
 * @param {string} key 去重的key
 * @example toolcore.uniqueBy([{name:'1111'},{name:'1111'},{name:'222'},{name:'333'}],'name') => [{name:'1111'},{name:'222'},{name:'333'}
 */
export const uniqueBy = function (arr, key) {
  return arr.filter((element, index, array) => array.findIndex(row => row[key] === element[key]) === index)
}

/**
 * 普通数组去重
 * @param {array} arr 去重的数组
 * @example toolcore.unique([1,2,2,3,4,3,4,7]) => [1, 2, 3, 4, 7]
 */
export const unique = (arr) =>
    arr.filter((element, index, array) => array.indexOf(element) === index)


/**
 * 找出数组中该属性最大值的一列
 * @param {array} arr 
 * @param {string} key 
 * @example toolcore.maxNumBy([{num:55},{num:541},{num:41}],'num') // => {num: 541}
 */
export const maxNumBy = (arr, key) =>
    arr.find(item => item[key] === Math.max.apply(Math, arr.map(row => row[key])))


/**
 * 找出数组中该属性最小值的一列
 * @param {array} arr 
 * @param {string} key 
 * @example toolcore.minNumBy([{num:55},{num:541},{num:41}],'num') // =>  {num: 41}
 */
export const minNumBy = (arr, key) =>
    arr.find(item => item[key] === Math.min.apply(Math, arr.map(row => row[key])))


/**
 * 数组中的最大值
 * @param {array} arr
 * @example toolcore.maxNum([12,3,31,5,3]) // => 31 
 */
export const maxNum = (arr) =>
    Math.max.apply(Math, arr)


/**
 * 数组中的最小值
 * @param {array} arr 
 * @example toolcore.minNum([12,3,31,5,3]) // => 3 
 */
export const minNum = (arr) =>
    Math.min.apply(Math, arr)

/**
 * 将数组打乱
 * @param {array} arr 
 */    
export const shuffle = (arr) => {
    let i = arr.length;
    while (i) {
        let j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr
}