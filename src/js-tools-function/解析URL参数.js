/**
 * 解析URL参数
 */
const getSearchParams = (str) => {
    const searchPar = new URLSearchParams(str || window.location.search)
    const paramsObj = {}

    for (const [key, value] of searchPar.entries()) {
      paramsObj[key] = value
    }

    return paramsObj
}


// 测试
// 假设目前位于 https://****com/index?id=154513&age=18;
console.log(getSearchParams('?id=154513&age=18')); // {id: "154513", age: "18"}