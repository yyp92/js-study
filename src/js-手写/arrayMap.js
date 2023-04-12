/**
 * map() 方法根据回调函数映射一个新数组
 */

Array.prototype.map1 = function(fn) {
    const res = []

    for (let i = 0; i < this.length; i++) {
        // 处理是稀疏数组的情况
        if (!this.hasOwnProperty(i)) {
            continue
        }

        res.push(fn(this[i], i, this))
    }

    return res
}


// 测试
const arr = [1, 2, 3, , 5]
const mapRes = arr.map1(item => item * 2)
console.log(mapRes)