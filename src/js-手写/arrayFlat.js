/**
 * 将嵌套的数组扁平化
 */

// 利用 ES6 语法 flat(num) 方法将数组拉平。
const flattening = (arr, num = 1) => {
    if (!Array.isArray(arr)) {
        return
    }

    return arr.flat(num)
}

// 利用 reduce() 方法将数组拉平。
const flattening1 = (arr) => {
    if (!Array.isArray(arr)) {
        return
    }

    return arr.reduce((a, b) => a.concat(Array.isArray(b) ? flattening1(b) : a), [])
}

// 模拟栈实现数组拉平
const flattening2 = (arr) => {
    if (!Array.isArray(arr)) {
        return
    }

    const stack = [...arr]
    const res = []

    while(stack.length) {
        let value = stack.shift()

        Array.isArray(value) ? stack.push(...value) : res.push(value)
    }

    return res
}


// 测试
const arr = [[1, 2, [3]], 4, [5, 6]]
console.log(flattening(arr))
console.log(flattening1(arr))
console.log(flattening2(arr))
