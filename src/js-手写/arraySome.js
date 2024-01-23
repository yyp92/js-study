/**
 * some() 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。
 */

Array.prototype.some1 = function(fn) {
    let bool = false

    for (let i = 0; i < this.length; i++) {
        if (!this.hasOwnProperty(i)) {
            continue
        }

        if (fn(this[i], i, this)) {
            bool = true
            break
        }
    }

    return bool
}


// 测试
const arr = [1, 2, 3, , 5]
const someArr = arr.some1(item => item > 3)
console.log(someArr)