/**
 * 大小写转换
 * 
 * str 待转换的字符串
 * type 1-全大写 2-全小写 3-首字母大写
 */
const turnCase = (str, type) => {
    switch (type) {
        case 1:
            return str.toUpperCase()

        case 2:
            return str.toLowerCase()

        case 3:
            //return str[0].toUpperCase() + str.substr(1).toLowerCase() // substr 已不推荐使用
            return str[0].toUpperCase() + str.substring(1).toLowerCase()

        default:
            return str
    }
}


// 测试
console.log(turnCase('vue', 1))
console.log(turnCase('REACT', 2))
console.log(turnCase('vue', 3))