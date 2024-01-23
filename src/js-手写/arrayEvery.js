/**
 * every() 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。
 */

Array.prototype.every1 = function(fn) {
    let bool = true

    for (let i = 0; i < this.length; i++) {
        if (!this.hasOwnProperty(i)) continue

        if (!fn(this[i], i, this)) {
            bool = false
            break
        }
    }

    return bool
}


// 测试
const arr = [1, 2, 3, , 5]
const everyArr = arr.every1(item => item > 3)
console.log(everyArr)