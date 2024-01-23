/**
 * 列表重复名加索引
 */

const repeatAddIndex = (arr = []) => {
    const obj = {}

    return arr.map(item => {
        if (obj[item.name] !== undefined) {
            obj[item.name]++
            item.name = `${item.name}（${obj[item.name]}）`
        }
        else {
            obj[item.name] = 0
        }

        return item
    })
}


// 测试
const arrNew = [
    {
        name: '小王',
        num: 1
    },
    {
        name: '小李',
        num: 1
    },
    {
        name: '小王',
        num: 2
    },
    {
        name: '小韩',
        num: 3
    },
    {
        name: '小李',
        num: 1
    },
    {
        name: '小王',
        num: 3
    },
]
console.log(repeatAddIndex(arrNew))