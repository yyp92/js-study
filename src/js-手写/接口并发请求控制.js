/**
 * 接口并发请求控制
 * 
 * tasks: 任务列表
 * poll: 每次控制的发送请求的数量
 */
const createRequest = function(tasks, poll = 5) {
    // 用于存储每一次请求的结果（按顺序进行存储）
    let results = []
    // together 用于创建工作区，当 pool 传入的是几，我们就对应的创建几个工作区
    // 也就是创建一个长度为 pool 且值为 null 的一个数组
    let together = new Array(poll).fill(null)
    // index 为每次获取的任务值
    let index = 0

    together = together.map(() => {
        // 基于Promise进行管理
        return new Promise((resolve, reject) => {
            // 创建一个函数，进来立刻执行
            const run = () => {
                // 如果任务池已经空了，说明请求发送完成了，直接成功
                if (index >= tasks.length) {
                    resolve()
                    return
                }

                // 先将index保存一下，用于存储当前成功请求的结果
                let old_index = index
                // 获取当前发送的请求，然后把index进行累加，所以上面会把index保存起来
                // 这里 index++ 是先运算后累加的，而 ++index 则相反，先累加后运算
                let task = tasks[index++]

                // 执行请求
                task().then(result => {
                    // 将成功结果保存
                    results[old_index] = result

                    // 递归继续执行，也就是继续拿到任务到工作区执行
                    run()
                })
                .catch(err => {
                    reject(err)
                })
            }

            // 立即执行
            run()
        })
    })

    // 用 Promise.all 管控工作区，也就是每次并发几个请求
    return Promise.all(together).then(() => results)
}


// 测试
const delay = (interval) => {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(interval)
        }, interval)
    })
}

const tasks = [
    () => delay(1000),
    () => delay(1003),
    () => delay(1005),
    () => delay(1002),
    () => delay(1004),
    () => delay(1006),
]

createRequest(tasks, 3).then(results => {
    // 都成功，整体才成功，按顺序存储结果
    console.log('成功', results)
}).catch(err => {
    // 只要有一个失败，整体失败
    console.log('失败')
})
