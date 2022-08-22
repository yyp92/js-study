/**
 * 数组的交集&并集
 */

// 交集
let arr1 = [1,2,3,4]
let arr2 = [4,5,6]
// 1. 常规for循环
const intersectionArr = (arr1, arr2) => {
    let arr = []

    for (let i = 0; i < arr1.length; i++){
        let _item = arr1[i]

        for (let j = 0; j < arr2.length; j++){
            if (_item === arr2[j]){
                arr.push(_item)
            }
        }
    }

    return arr
}

// 2. 利用filter和includes
const intersectionArr1 = (arr1, arr2) => {
    return arr1.filter(item => arr2.includes(item))
}

// 3. 利用reduce
const intersectionArr2 = (arr1, arr2) => {
    let _arr = arr1.concat(arr2).sort()

    let result = []
    _arr.reduce((pre, now) => {
        if (pre === now) {
            result.push(now)
        }

        return now
    })

    return result
}



// 并集
// 1. 利用解构赋值...和Set的唯一性）
const unionArr = (arr1,arr2 ) => {
    return [...new Set(arr1.concat(arr2))]
}

// 2. reduce
const unionArr1 = (arr1, arr2) => {
    let _arr = [...arr1,...arr2].sort()
    let result = []

    _arr.reduce((pre, now) => {
        if(pre !== now){
            result.push(now)
        }

        return now
    })

    return result
}