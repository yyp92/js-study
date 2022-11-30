// 标题
// 实现Promise.race方法

// 题目描述
function race(promiseArr, k) {
    return new Promise((resolve, reject) => {
        const res = []

        for (let i = 0; i < promiseArr.length; i++) {
            Promise.resolve(promiseArr[i]).then(result => {
                res.push(result)

                if (res.length === k) {
                    resolve(res)
                }
            }).catch(e => {
                reject(e)
            })
        }
    })
}

var promiseA = new Promise((resolve) => {
    setTimeout(() => {
        resolve(1);
    }, 1000);
});
var promiseB = new Promise((resolve) => {
    setTimeout(() => {
        resolve(2);
    }, 1500);
});
var promiseC = new Promise((resolve) => {
    setTimeout(() => {
        resolve(3);
    }, 500);
});
race([promiseA, promiseB, promiseC], 2).then((res) => {
    console.log(res); // [3, 1]​
});
// 输出最快执行完成的前k个promise结果