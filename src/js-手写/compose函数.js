/**
 * compose 函数是用来组合合并函数，最后输出值的思想。在 redux 源码中用于中间件的处理。
 */

// 递归实现 - 执行顺序式从右往左
const compose1 = function(...funcs) {
    // 拿funcs的长度
    let len = funcs.length
    // 用来承接每次函数执行后的结果
    let res = null 
    // 返回一个函数，初始参数还得自己加，也就是compose(函数组合)(初始参数)

    return function func(...arg){
        // 每次函数运行的结果
        res = funcs[len - 1].apply(null, arg)

        if (len > 1) {
            len--

            // 函数组合中还有函数就继续执行，res就是函数执行后得到的结果；
            // 返回func并把res作为参数，继续执行func；
            return func.call(null, res)
        }

        // 函数组合中没有了函数便返回res最终结果
        return res
    }
}

// reduce实现 - 执行顺序式从左往右
const compose2 = function (...funcs){
    // 没有放函数，那就返回传入参数
    if (funcs.length === 0) return (num) => num

    // 函数组合长度为1，返回函数
    if (funcs.length === 1) return funcs[0]

    // 其余情况，对funcs进行reduce，里面的函数会从左往右执行，
    // 第一个函数执行完返回的结果将会传递到下一个函数中作为参数继续执行
    
    // 总体会返回一个方法，用法：compose(函数组合)(传入参数num)
    return funcs.reduce((pre, cur) => {
        // 返回一个函数作为下一个pre，函数内执行cur(pre(num)),
        return (num) => {
            // pre(num)是函数组合内上一个函数执行,
            // cur(pre(num))指的是当前函数执行
            // 返回cur(pre(num))作为新的参数给下个函数继续执行
            return cur(pre(num))
        }
    })
}


// 测试
function fn1(num) {
    return num + 1
}
function fn2(num) {
    return num + 2
}
function fn3(num) {
    return num + 3
}
console.log(compose1(fn1, fn2, fn3)(5))
console.log(compose2(fn1, fn2, fn3)(5))