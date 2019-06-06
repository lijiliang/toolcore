# [toolcore](https://github.com/lijiliang/toolcore)

常用前端代码工具库(**不定时更新**)

> 目的：高效率完成前端业务代码

业务开发过程中，会经常用到`String,Number,Array,Object,Function,Date扩展方法`、`浏览器类型判断`、`base64`、`表单验证`、`url常用方法`等常用函数，为避免不同项目多次复制粘贴的麻烦，这里统一封装，并发布到npm，以提高开发效率。如果你也有常用的代码，欢迎为本项目提交pr.

## 安装使用

1. 直接下载`dist`目录下的[index.js](https://github.com/lijiliang/toolcore/blob/master/dist/index.js)使用,支持UMD,CommonJS,ES6各模块化规范。
2. 使用npm/yarn/cnpm安装,支持CommonJS,ES6各模块化规范。

### 浏览器:
``` html
<script src="https://unpkg.com/toolcore"></script>
<!-- <script src="./dist/index.js"></script> -->
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

> ###  [Array](https://github.com/lijiliang/toolcore/blob/master/src/array.js)

- uniqueBy 根据属性去重数组。
- unique 普通数组去重。
- maxNumBy 找出数组中该属性最大值的一列。
- minNumBy 找出数组中该属性最小值的一列。
- maxNum 数组中的最大值。
- mixNum 数组中的最小值。
- shuffle 将数组打乱
- equal 判断两个数组是否相等

> ###  [base64](https://github.com/lijiliang/toolcore/blob/master/src/base64.js)

- encode base64加密。
- decode base64解密。