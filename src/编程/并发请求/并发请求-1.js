/**
 * 题目描述：
 * * 实现一个方法 request, 同时可最多请求 N 个，超过时等待前面请求完成后继续请求
 * * 实际发送请求可以用 fetch 或 request 代替，请求参数只需要 url 即可
 * * 需要考虑请求失败的情况
 * 
 * 可以参考：https://www.cnblogs.com/echolun/p/15906939.html
 */

// 假设请求API为
const request = (params) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(params), 1000);
    });
}

// * 限制请求并发数量
const limitFetch = (limit = 3) => {
    const pending = [];
    let count = 0;
  
    // 处理request以及limit判断的地方
    const run = () => {
        // 数组为空吗？ || 超出limit限制了吗？
        if (!pending.length || count >= limit) {
            return;
        }

        // 依次取出之前存储的参数
        // const param = pending.shift();
        const [param, resolve, reject] = pending.shift();
        count++;

        request(param)
            .then(resolve)
            .catch(reject)
            .finally(() => {
                count--;

                // 递归，继续判断能不能执行下一个request
                run();
            });
    };

    // 返回一个创建请求的方法
    return function(param) {
        // 内部返回一个promise
        return new Promise((resolve, reject) => {
            // 存储数据
            // pending.push(param);

            // 希望 fetchInstance('a_url')创建的Promise能感知状态变化
            pending.push([param, resolve, reject]);

            // 开始请求
            run();
        });
    };
}




// 示例
const fetchInstance = limitFetch(2)
fetchInstance('a_url').then(() => {
    console.log('a_url fetch success')
});
fetchInstance('b_url').then(() => {
    console.log('b_url fetch success')
});
fetchInstance('c_url').then(() => {
    console.log('c_url fetch success')
});
fetchInstance('d_url').then(() => {
    console.log('d_url fetch success')
});

// a_url fetch success
// b_url fetch success
// c_url fetch success
// d_url fetch success