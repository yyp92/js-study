/**
 * 实现 instanceof 
 * 
 * instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 */

const _instanceof = function(left, right) {
    if (!left && !right) {
        return
    }

    const rightPrototype = right.prototype

    while(left = Object.getPrototypeOf(left)) {
        if (left === rightPrototype) {
            return true
        }
    }

    return false
}


// 测试
const obj = {a: 1}
console.log(_instanceof(obj, Object))