/**
 * 函数柯里化的是一个为多参函数实现递归降解的方式。
 * 
 * 其实现的核心是:
 *  要思考如何缓存每一次传入的参数
 *  传入的参数和目标函数的入参做比较
 * 
 * 这里通过闭包的方式缓存参数
 */

const curry = (fn) => {
    let params = []

    const next = (...args) => {
        params = [...params, ...args]

        if (params.length < fn.length) {
            return next
        }
        else {
            return fn.apply(fn, params)
        }
    }

    return next
}


// 测试
const sum = (a, b, c, d) => {
    return a + b + c + d
}

const fn = curry(sum)
const res = fn(1)(2)(3)(4)
console.log(res)