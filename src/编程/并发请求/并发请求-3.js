/**
 * 题目描述：
 * 
 * 同样是限制器问题，不过这次参数是直接传入了一个数组，要求同样是是并发最多同时处理3个请求，但要求如果全部成功则返回结果的数组，且结果顺序与参数顺序保持一致，如果失败则直接返回失败，是不是有点Promise.all()的意思了：
 * 
 * 
 * 可以参考：https://www.cnblogs.com/echolun/p/15906939.html
 */

// 假设请求API为
const request = (params) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(params), 1000);
    });
}


// 最多处理3个请求的调度器
const Scheduler = (list = [], limit = 3) => {
    // 调用次数
    let count = 0;
    // 用于统计成功的次数
    let resLength = 0;
    // 浅拷贝一份，原数据的length我们还有用
    const pending = [...list];
    const resList = [];

    // 一定得返回一个promise
    return new Promise((resolve, reject) => {
        const run = () => {
            if (!pending.length || count >= limit) return;

            count++;
            // 记录顺序
            const index = list.length - pending.length;
            const params = pending.shift();

            request(params)
                .then((res) => {
                    // 使用输出来验证限制器生效没
                    // console.log('用于验证限制器:', res);

                    count--;
                    resLength++;
                    // 按index来保存结果
                    resList[index] = res;
                    
                    // 全部成功了吗？没有就继续请求，否则resolve(resList)跳出递归;
                    resLength === list.length ? resolve(resList) : run();
                })
                // 有一个失败就直接失败
                .catch(reject) 
        };

        // 遍历，模拟前两次依次调用的动作，然后在run内部控制如何执行
        list.forEach(() => run());
    })
}



// 示例
// 1 2 3 4 5
Scheduler([1, 2, 3, 4, 5]).then(console.log); 