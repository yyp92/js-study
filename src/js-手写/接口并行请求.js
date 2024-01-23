/**
 * 接口并行请求
 */
const a = new Promise((resolve, reject) => {
    // 模拟异步任务
    setTimeout(function() {
        resolve('a');
    }, 1000)
})
.then(result => result)
.catch(e => {})

const b = new Promise((resolve, reject) => {
    setTimeout(function() {
        // resolve('b');
        reject('Error in b');
    }, 2000)
})
.then(result => result)
.catch(e => e)


Promise.all([a, b]).then(data => {
    console.log('data', data)
})
.catch(e => console.log('Promise.all erro:', e));



/**
 * 多个并行实现
 */
// promise 版本
const parallelPromise = (arr = []) => {
    Promise.all(arr).then(data => {
        console.log('data', data)
    })
}

// asnyc await 版本
const parallelAsyncAwait = async function(promiseArr) {
    let awaitArr = []

    for (let i = 0, len = arr.length; i < len; i++) {
        let currentPromise = promiseArr[i]
        let result = await currentPromise
        awaitArr.push(result)
    }

    return awaitArr
}



// 测试
const createPromise = function(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('time', time);

            resolve(time)
        }, time * 1000)
    })
}
const arr = [createPromise(2), createPromise(3), createPromise(1), createPromise(4), createPromise(5)];
// parallelPromise(arr)
// async 返回的是一个promise 
parallelAsyncAwait(arr).then(data => {
    console.log('data', data);
})