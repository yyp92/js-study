/**
 * reduce() 方法循环迭代，回调函数的结果都会作为下一次的形参的第一个参数。
 */

Array.prototype.reduce1 = function(fn, initValue) {
    let res = initValue ? initValue : this[0]

    for (let i = initValue ? 1 : 0; i < this.length; i++) {
        if (!this.hasOwnProperty(i)) {
            continue
        }

        res = fn(res, this[i], i, this)
    }

    return res
}


// 测试
const arr = [1, 2, 3, , 5]
const reduceArr = arr.reduce((a, b) => a * b, 2)
console.log(reduceArr)