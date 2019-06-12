# [toolcore](https://github.com/lijiliang/toolcore)

常用前端代码工具库(**不定时更新**)

> 目的：高效率完成前端业务代码

业务开发过程中，会经常用到`String,Number,Array,Object,Function,Date扩展方法`、`浏览器类型判断`、`base64`、`表单验证`、`url常用方法`等常用函数，为避免不同项目多次复制粘贴的麻烦，这里统一封装，并发布到npm，以提高开发效率。如果你也有常用的代码，欢迎为本项目提交pr.

## 安装使用

1. 直接下载`dist`目录下的[toolcore.min.js](https://github.com/lijiliang/toolcore/blob/master/dist/toolcore.min.js)使用,支持UMD,CommonJS,ES6各模块化规范。
2. 使用npm/yarn/cnpm安装,支持CommonJS,ES6各模块化规范。

### 浏览器:
``` html
<script src="https://unpkg.com/toolcore"></script>
<!-- <script src="./dist/toolcore.min.js"></script> -->
<script>
	let max = toolcore.maxNum([12,3,31,5,3]) 
	console.log(max) // => "31"
</script>
```

### npm
``` bash
$ npm i toolcore
```
### yarn
``` bash
$ yarn add toolcore
```
### cnpm
``` bash
$ cnpm i toolcore
```

React、VueJS,小程序等javascript环境

``` javascript
// 完整引入
import toolcore from 'toolcore'
let txt = toolcore.mask('12398765432',3,7) 
console.log(txt) // => "123****5432"
```

**推荐使用方法**

你真的不需要完整引入所有函数，所以只引入需要使用的方法即可。
``` javascript
import { mask } from 'toolcore'
let txt = mask('12398765432',3,7) 
console.log(txt) // => "123****5432"
```

## :package:  API文档

> ###  [TypeOf](https://github.com/lijiliang/toolcore/blob/master/src/types.js)

- isNull 判断类型Null。
- isUndefined 判断类型Undefined。
- isBoolean 判断类型Boolean。
- isNumber 判断类型Number。
- isString 判断类型String。
- isSymbol 判断类型Symbol。
- isObject 判断类型Object。
- isRegExp 判断类型RegExp。
- isArray 判断类型Array。
- isFunction 判断类型Function。
- getType 获取类型，全能型的typeOf。
- inBrowser 判断是否为浏览器。

> ###  [base64](https://github.com/lijiliang/toolcore/blob/master/src/base64.js)

- encode base64加密。
- decode base64解密。

> ###  [Date](https://github.com/lijiliang/toolcore/blob/master/libs/date.js)

- timejs 格式化时间。
- formatHMS 将秒数转为 xx小时xx分钟xx秒 例如1h0m10s。
- unix 获取时间戳 (秒)

> ###  [EventEmitter](https://github.com/lijiliang/toolcore/blob/master/libs/event.js)

- on 		为指定事件注册一个监听器。
- once 		为指定事件注册一个单次监听器。
- emit 		触发指定事件的监听器。
- off		移除指定事件的监听器。
- allOff	移除所有事件的所有监听器，如果指定事件，则移除指定事件的所有监听器。

> ###  [Array](https://github.com/lijiliang/toolcore/blob/master/src/array.js)

- uniqueBy 根据属性去重数组。
- unique 普通数组去重。
- maxNumBy 找出数组中该属性最大值的一列。
- minNumBy 找出数组中该属性最小值的一列。
- maxNum 数组中的最大值。
- mixNum 数组中的最小值。
- shuffle 将数组打乱
- equal 判断两个数组是否相等

> ###  [Function](https://github.com/lijiliang/toolcore/blob/master/libs/function.js)

- debounceStart 函数防抖 (立即执行版)。
- debounceEnd 函数防抖 (非立即执行版)。
- debounce 函数防抖 (完全版)。
- throttle 函数节流。

> ###  [Number](https://github.com/lijiliang/toolcore/blob/master/libs/number.js)

- randomNum 返回指定范围内的随机整数。
- round 将数字四舍五入到指定的小数位数。
- sum 返回两个或两个以上数字/数字数组中元素之和。
- sumBy 根据函数映射每个元素，然后返回数组的和。
- toDecimalMark 将数字转化为千分位格式，可以在数字前面加上符号。
- accAdd 加法运算,可浮点安全运算。 
- accSub 减法运算,可浮点安全运算。
- accMul 乘法运算,可浮点安全运算。
- accDiv 除法运算,可浮点安全运算。
- getrandom 产生n个随机数,并且随机数之和是固定值

> ###  [Object](https://github.com/lijiliang/toolcore/blob/master/libs/object.js)

- deepClone 深度克隆。
- orderBy 	返回按属性(props)和顺序(orders)排序的对象数组,用于数据排序。
- findPathByLeafId 根据 key 递归查找链带关系。
- merge 对象合并。

> ###  [String](https://github.com/lijiliang/toolcore/blob/master/libs/string.js)

- mask 根据位置,使用 * 遮蔽字符串。
- maskLeft 从位置左边开始，使用 * 遮蔽字符串。
- maskRight 从位置右边开始，使用 * 遮蔽字符串。
- randomHexColorCode 生成一个随机的十六进制颜色代码。
- getCounts 返回元素出现的次数。
- uuid 全局唯一标识符 UUID
- guid GUID:128位的数字标识符


> ###  [url](https://github.com/lijiliang/toolcore/blob/master/libs/url.js)

- insertUrl 根据对象中的参数匹配插入到url中。
- URLSearchParams url 序列化和反序列化。
- Url 返回网址的相关信息，模拟了 浏览器的 new URL(urlString) 部分功能