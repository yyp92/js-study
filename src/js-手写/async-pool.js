/**
 * asyncPool 比较完美的实现
 * @param {*} poolLimit 表示限制的并发数；
 * @param {*} array 表示任务数组；
 * @param {*} iteratorFn 表示迭代函数，用于实现对每个任务项进行处理，该函数会返回一个 Promise 对象或异步函数。
 * @returns 
 */
async function asyncPool(poolLimit, array, iteratorFn) {
    // 存储所有的异步任务
    const ret = []; 
    // 存储正在执行的异步任务
    const executing = []; 
  
    for (const item of array) {
        // 调用iteratorFn函数创建异步任务
        const p = Promise.resolve().then(() => iteratorFn(item, array));
        // 保存新的异步任务
        ret.push(p); 
    
        // 当poolLimit值小于或等于总任务个数时，进行并发控制
        if (poolLimit <= array.length) {
            // 当任务完成后，从正在执行的任务数组中移除已完成的任务
            const e = p.then(() => executing.splice(executing.indexOf(e), 1));
            // 保存正在执行的异步任务
            executing.push(e); 

            if (executing.length >= poolLimit) {
                // 等待较快的任务执行完成
                await Promise.race(executing); 
            }
        }
    } 
  
    return Promise.all(ret);
}
  
const timeout = i => new Promise(resolve => {
    setTimeout(() => { 
        console.log(i); 
        resolve(i)
    }, i)
});
// 当然,limit <= 0 的时候 我们可以理解为只允许一个请求存在 
asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(res => {
    console.log(res)
})