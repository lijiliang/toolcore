// const { shuffle } = require('toolcore')
const { shuffle, Timejs } = require('../dist/toolcore.common')

console.log(shuffle([1, 2, 3, 4]))

// toolcore.Timejs(new Date()).format('YYYY-MM-DD HH:mm:ss dddd MMMM M MM', 'cn')

console.log(Timejs(new Date()).format('YYYY-MM-DD HH:mm:ss dddd MMMM M MM'))
