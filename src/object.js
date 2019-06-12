import { isObject } from './types'

/**
 * 深度克隆
 * @param {*} obj
 */
export const deepClone = (obj) => {
  if (obj === null) {
    return obj
  }
  if (obj instanceof Array) {
    return obj.map(row => deepClone(row))
  }
  if (obj instanceof Object) {
    let ret = {}
    Object.keys(obj).forEach(key => {
      if (obj[key] instanceof Date) {
        ret[key] = new Date(obj[key].getTime())
      } else {
        ret[key] = deepClone(obj[key])
      }
    })
    return ret
  }
  return obj
}

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
export const orderBy = (arr, props, orders) => {
  return [...arr].sort((a, b) =>
    props.reduce((acc, prop, i) => {
      if (acc === 0) {
        const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]]
        acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0
      }
      return acc
    }, 0)
  )
}

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
export const findPathByLeafId = (leafIdName, leafId, nodes, path = []) => {
  for (var i = 0; i < nodes.length; i++) {
    var tmpPath = [...path]
    if (leafId === nodes[i][leafIdName]) {
      return tmpPath
    }

    tmpPath.push({
      [leafIdName]: nodes[i][leafIdName],
      value: nodes[i].name
    })
    if (nodes[i].children) {
      let findResult = findPathByLeafId(leafIdName, leafId, nodes[i].children, tmpPath)
      if (findResult) {
        return findResult
      }
    }
  }
}

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
export const merge = (a, b) => {
  for (var key in b) {
    if (!a.hasOwnProperty(key)) {
      a[key] = b[key]
    } else if (isObject(b[key]) && isObject(a[key])) {
      merge(a[key], b[key])
    }
  }
  return a
}
