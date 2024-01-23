/**
 * 封装数据类型函数
 */

const type = (function() {
    const type = Object.create(null)
    const typeArray = [
        'String',
        'Number',
        'Object',
        'Array',
        'Null',
        'Undefined',
        'Boolean'
    ]

    for (let i = 0; i < typeArray.length; i++) {
        type[`is${typeArray[i]}`] = function(args) {
            return Object.prototype.toString.call(args) === '[object' + ' ' + typeArray[i] + ']'
        }
    }

    return type
})()


// 测试
console.log(type.isArray({a: 1, length: 1}))
console.log(type.isString(12))