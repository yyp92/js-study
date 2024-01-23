/**
 * Promsie.prototype.all
 * 有一个失败则返回失败的结果，全部成功返回全成功的数组
 */
Promise.prototype.all1 = function (promiseList = []) {
    return new Promise((resolve, reject) => {
        const result = []
        let count = 0 
    
        if (promiseList.length === 0) {
            resolve(result)
            return
        } 
    
        for (let i = 0; i < promiseList.length; i++) {
            Promise.resolve(promiseList[i]).then(res => {
                result[i] = res
                count++ 
        
                // 不能直接通过 result.length 进行比较，因为 会存在下标大的先赋值
                // 例如 i = 3 第一个返回结果，此时数组变为[empty,empty,empty,res]
                if (count === promiseList.length) {
                    resolve(result)
                }
            }).catch(e => {
                reject(e)
            })
        }
    })
} 


/**
 * Promsie.prototype.race
 * 返回第一个成功或失败的结果
 */
Promise.prototype.race1 = function (promiseList = []) {
    return new Promise((resolve, reject) => {
        if (promiseList.length === 0) {
            return resolve([])
        } 
    
        for (let i = 0; i < promiseList.length; i++) {
            Promise.resolve(promiseList[i]).then(res => {
                resolve(res)
            }).catch(e => {
                reject(e)
            })
        }
    })
} 


/**
 * Promsie.prototype.allSettled 
 * 无论成功于否都返回，但是会添加一个 status 字段用于标记成功/失败
 */
Promsie.prototype.allSettled1 = function (promiseList = []) {
    return new Promise((resolve, reject) => {
        const result = []
        let count = 0
    
        const addRes = (i, data) => {
            result[i] = data
            count++

            if (count === promiseList.length) {
                resolve(result)
            }
        }
    
        if (promiseList.length === 0) return resolve(result) 
    
        for (let i = 0; i < promiseList.length; i++) {
            Promise.resolve(promiseList[i]).then(res => {
                addRes(i, { status: 'fulfilled', data: res })
            }).catch(e => {
                addRes(i, { status: 'rejected', data: e })
            })
        }
    })
} 


/**
 * Promsie.prototype.any
 * 和 Promise.all 相反，全部失败返回失败的结果数组，有一个成功则返回成功结 
 */
Promsie.prototype.any1 = function (promiseList = []) {
    return new Promise((resolve, reject) => {
        if (promiseList.length === 0) return resolve([]) 
    
        let count = 0
        const result = [] 
    
        for (let i = 0; i < promiseList.length; i++) {
            Promise.resolve(promiseList[i]).then(res => {
                resolve(res)
            }).catch(e => {
                count++
                result[i] = e
                
                if (count === promiseList.length) {
                    reject(new AggregateError(result))
                }
            })
        }
    })
}