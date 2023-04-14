/**
 * 接口串行请求
 */

// promise 版本
const serialPromise = (rest) => {
    const {a, b} = rest
    
    a().then((aa) => {
        b().then((bb) => {
            console.log(`${aa}-${bb}`)
            console.timeEnd('test')
        })
    })
}

// async await 版本
const serialAsyncAwait = async (rest) => {
    const {a, b} = rest

    console.time('test-async')
    var aa = await a()
    var bb = await b()
    console.log(`${aa}-${bb}`)
    console.timeEnd('test-async')
}


// 测试
const a = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('a')
            resolve('a')
        }, 3000)
    })
}

const b = function() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('b')
            resolve('b')
        }, 2000)
    })
};

console.time('test')
serialPromise({a, b})
serialAsyncAwait({a, b})



/**
 * 但当我们有多个异步，比如2000个该如何
 */
// promise 版本
function serpromise(arr) {
    arr.reduce((pre, next, index, carr) => {
        return pre.then(next)
    }, Promise.resolve())
}


// async await 版本
const serAsyncAwait = async function(promiseArr) {
    for (let i = 0, len = arr.length; i < len; i++) {
        let currentPromise = promiseArr[i]
        await currentPromise()
    }
}


// 测试
// 相当于
// Promise.resolve().then(createPromise(2)).then(createPromise(1))......	
const createPromise = function(time) {
    // then中的回调函数 
    return (resolve, reject) => {
        return new Promise((resolve, reject) => {
            // 模拟请求 (真实使用把time设置为0，将resolve传入异步函数中)
            setTimeout(() => {
                console.log('timein' + time)

                // 在异步处理结束后resolve
                resolve(); 
            }, time * 1000)
        })
    }
} 
const arr = [createPromise(2), createPromise(3), createPromise(1), createPromise(4), createPromise(5)];
// serpromise(arr)
serAsyncAwait(arr)
