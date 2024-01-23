/**
 * 数组对象根据字段去重
 * 
 * arr 要去重的数组
 * key 根据去重的字段名
 */
const uniqueArrayObject = (arr = [], key = 'id') => {
    if (arr.length === 0) return

    let list = []
    const map = {}

    arr.forEach((item) => {
        if (!map[item[key]]) {
            map[item[key]] = item
        }
    })
    list = Object.values(map)
  
    return list
}


// 测试
const responseList = [
    { id: 1, name: '树哥' },
    { id: 2, name: '黄老爷' },
    { id: 3, name: '张麻子' },
    { id: 1, name: '黄老爷' },
    { id: 2, name: '张麻子' },
    { id: 3, name: '树哥' },
    { id: 1, name: '树哥' },
    { id: 2, name: '黄老爷' },
    { id: 3, name: '张麻子' },
]
// [{ id: 1, name: '树哥' },{ id: 2, name: '黄老爷' },{ id: 3, name: '张麻子' }]
console.log(uniqueArrayObject(responseList, 'id'))

