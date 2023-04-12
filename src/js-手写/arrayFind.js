/**
 * find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
 */

Array.prototype.find1 = function(fn) {
    let res;

    for (let i = 0; i < this.length; i++) {
        if (!this.hasOwnProperty) {
            continue
        }

        if (fn(this[i], i, this)) {
            res = this[i]
            break
        }
    }

    return res
}


// 测试
const arr = [1, 2, 3, , 5]
const findArr = arr.find1(item => item > 6)
console.log(findArr)