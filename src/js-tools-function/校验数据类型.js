/**
 * 校验数据类型
 */
const typeOf = function(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}


// 测试
console.log(typeOf('树哥'))  // string
console.log(typeOf([]))  // array
console.log(typeOf(new Date()))  // date
console.log(typeOf(null)) // null
console.log(typeOf(true)) // boolean
console.log(typeOf(() => { })) // function