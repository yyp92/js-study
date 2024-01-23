/**
 * 题目描述：
 * * 实现一个方法 request, 同时可最多请求 N 个，超过时等待前面请求完成后继续请求
 * * 实际发送请求可以用 fetch 或 request 代替，请求参数只需要 url 即可
 * * 需要考虑请求失败的情况
 * 
 * 可以参考：https://www.cnblogs.com/echolun/p/15906939.html
 */



// 示例
const fetchInstance = limitFetch(3)
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