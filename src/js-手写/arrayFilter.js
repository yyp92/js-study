/**
 * filter() 方法返回一个数组，返回的每一项是在回调函数中执行结果 true。
 */

Array.prototype.filter1 = function(fn) {
    const res = []

    for (let i = 0; i < this.length; i++) {
        if (!this.hasOwnProperty(i)) {
            continue
        }

        fn(this[i], i, this) && res.push(this[i])
    }

    return res
}


// 测试
const arr = [1, 2, 3, , 5]
const filterRes = arr.filter1(item => item > 2)
console.log(filterRes)