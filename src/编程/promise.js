/**
 * 手动实现promise
 * 资料：https://juejin.cn/post/6850037281206566919
 * 
 * promise/A+规范
 *  1. promise 有三个状态：pending，fulfilled，or rejected；「规范 Promise/A+ 2.1」
 *  2. new promise时， 需要传递一个executor()执行器，执行器立即执行；
 *  3. executor接受两个参数，分别是resolve和reject；
 *  4. promise  的默认状态是 pending；
 *  5. promise 有一个value保存成功状态的值，可以是undefined/thenable/promise；「规范 Promise/A+ 1.3」
 *  6. promise 有一个reason保存失败状态的值；「规范 Promise/A+ 1.5」
 *  7. promise 只能从pending到rejected, 或者从pending到fulfilled，状态一旦确认，就不会再改变；
 *  8. promise 必须有一个then方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled, 和 promise 失败的回调 onRejected；「规范 Promise/A+ 2.2」
 *  9. 如果调用 then 时，promise 已经成功，则执行onFulfilled，参数是promise的value；
 *  10. 如果调用 then 时，promise 已经失败，那么执行onRejected, 参数是promise的reason；
 *  11. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调onRejected；
 * 
 * then 的链式调用&值穿透特性：
 *  1. then 的参数 onFulfilled 和 onRejected 可以缺省，如果 onFulfilled 或者 onRejected不是函数，将其忽略，且依旧可以在下面的 then 中获取到之前返回的值；「规范 Promise/A+ 2.2.1、2.2.1.1、2.2.1.2」
 *  2. promise 可以 then 多次，每次执行完 promise.then 方法后返回的都是一个“新的promise"；「规范 Promise/A+ 2.2.7」
 *  3. 如果 then 的返回值 x 是一个普通值，那么就会把这个结果作为参数，传递给下一个 then 的成功的回调中；
 *  4. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.2.7.2」
 *  5. 如果 then 的返回值 x 是一个 promise，那么会等这个 promise 执行完，promise 如果成功，就走下一个 then 的成功；如果失败，就走下一个 then 的失败；如果抛出异常，就走下一个 then 的失败；「规范 Promise/A+ 2.2.7.3、2.2.7.4」
 *  6. 如果 then 的返回值 x 和 promise 是同一个引用对象，造成循环引用，则抛出异常，把异常传递给下一个 then 的失败的回调中；「规范 Promise/A+ 2.3.1」
 *  7. 如果 then 的返回值 x 是一个 promise，且 x 同时调用 resolve 函数和 reject 函数，则第一次调用优先，其他所有调用被忽略；「规范 Promise/A+ 2.3.3.3.3」
 */

// 三个状态：PENDING、FULFILLED、REJECTED
const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

const resolvePromise = (promise2, x, resolve, reject) => {
    // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise  Promise/A+ 2.3.1
    if (promise2 === x) { 
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    // Promise/A+ 2.3.3.3.3 只能调用一次
    let called;
    // 后续的条件要严格判断 保证代码能和别的库一起使用
    if ((typeof x === 'object' && x != null) || typeof x === 'function') { 
        try {
            // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）  Promise/A+ 2.3.3.1
            let then = x.then;

            if (typeof then === 'function') { 
                // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty  Promise/A+ 2.3.3.3
                then.call(
                    x,
                    // 根据 promise 的状态决定是成功还是失败
                    y => {
                        if (called) return;
                        called = true;
                        // 递归解析的过程（因为可能 promise 中还有 promise） Promise/A+ 2.3.3.3.1
                        resolvePromise(promise2, y, resolve, reject); 
                    },
                    r => {
                        // 只要失败就失败 Promise/A+ 2.3.3.3.2
                        if (called) return;
                        called = true;
                        reject(r);
                    }
                );
            } 
            else {
                // 如果 x.then 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.3.4
                resolve(x);
            }
        }
        catch (e) {
            // Promise/A+ 2.3.3.2
            if (called) return;
            called = true;
            reject(e)
        }
    }
    else {
      // 如果 x 是个普通值就直接返回 resolve 作为结果  Promise/A+ 2.3.4  
      resolve(x)
    }
}

class Promise {
    constructor(executor) {
        // 默认状态为 PENDING
        this.status = PENDING;
        // 存放成功状态的值，默认为 undefined
        this.value = undefined;
        // 存放失败状态的值，默认为 undefined
        this.reason = undefined;
        // 存放成功的回调
        this.onResolvedCallbacks = [];
        // 存放失败的回调
        this.onRejectedCallbacks= [];


        // 调用此方法就是成功
        let resolve = (value) => {
            // ======新增逻辑======
            // 为了实现Promise.resolve
            // 如果 value 是一个promise，那我们的库中应该也要实现一个递归解析
            if (value instanceof Promise){
                // 递归解析 
                return value.then(resolve, reject)
            }

            // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
            if (this.status ===  PENDING) {
                this.status = FULFILLED;
                this.value = value;

                // 依次将对应的函数执行
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        } 

        // 调用此方法就是失败
        let reject = (reason) => {
            // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
            if (this.status ===  PENDING) {
                this.status = REJECTED;
                this.reason = reason;

                // 依次将对应的函数执行
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            // 立即执行，将 resolve 和 reject 函数传给使用者  
            executor(resolve, reject)
        }
        catch (error) {
            // 发生异常时执行失败逻辑
            reject(error)
        }
    }

    // Promise.resolve()
    static resolve(data){
        return new Promise((resolve, reject)=>{
          resolve(data);
        })
    }

    // Promise.reject()
    static reject(reason){
        return new Promise((resolve, reject)=>{
            reject(reason);
        })
    }

    // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
    then(onFulfilled, onRejected) {
        //解决 onFufilled，onRejected 没有传值的问题
        //Promise/A+ 2.2.1 / Promise/A+ 2.2.5 / Promise/A+ 2.2.7.3 / Promise/A+ 2.2.7.4
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        //因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };

         // 每次调用 then 都返回一个新的 promise  Promise/A+ 2.2.7
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                // Promise/A+ 2.2.2
                // Promise/A+ 2.2.4 --- setTimeout
                setTimeout(() => {
                    try {
                        // Promise/A+ 2.2.7.1
                        let x = onFulfilled(this.value);
                        // x可能是一个proimise
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        // Promise/A+ 2.2.7.2
                        reject(e)
                    }
                }, 0);
            }

            if (this.status === REJECTED) {
                // Promise/A+ 2.2.3
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    }
                    catch (e) {
                        reject(e)
                    }
                }, 0);
            }

            if (this.status === PENDING) {
                // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        }
                        catch (e) {
                            reject(e)
                        }
                    }, 0);
                });
        
                // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
                this.onRejectedCallbacks.push(()=> {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject)
                        }
                        catch (e) {
                            reject(e)
                        }
                    }, 0);
                });
              }
        })

        return promise2
    }

    // catch
    catch(errCallback) {
        return this.then(null, errCallback)
    }
    
    // finally
    finally(callback) {
        return this.then(
            (value) => {
                return Promise.resolve(callback()).then(() => value)
            },
            (reason) => {
                return Promise.resolve(callback()).then(() => {throw reason})
            }
        )  
    }

    // Promise.all 是解决并发问题的
    static all(values) {
        if (!Array.isArray(values)) {
            const type = typeof values;
            return new TypeError(`TypeError: ${type} ${values} is not iterable`)
        }
        
        return new Promise((resolve, reject) => {
            let resultArr = [];
            let orderIndex = 0;

            const processResultByKey = (value, index) => {
                resultArr[index] = value;

                if (++orderIndex === values.length) {
                    resolve(resultArr)
                }
            }
            
            for (let i = 0; i < values.length; i++) {
                let value = values[i];
                
                if (value && typeof value.then === 'function') {
                    value.then((value) => {
                        processResultByKey(value, i);
                    }, reject);
                }
                else {
                    processResultByKey(value, i);
                }
            }
        })
    }
    
    // Promise.race 用来处理多个请求，采用最快的（谁先完成用谁的）。
    static race(promises) {
        return new Promise((resolve, reject) => {
            // 一起执行就是for循环
            for (let i = 0; i < promises.length; i++) {
                let val = promises[i];

                if (val && typeof val.then === 'function') {
                    val.then(resolve, reject);
                }
                // 普通值
                else {
                    resolve(val)
                }
            }
        })
    }
}



// 测试
// const promise = new Promise((resolve, reject) => {
//     // resolve('成功');
//     setTimeout(() => {
//         resolve('成功');
//     },1000);
// }).then(
//     (data) => {
//         console.log('success', data)
//     },
//     (err) => {
//         console.log('faild', err)
//     }
// )

// const promise = new Promise((resolve, reject) => {
//     reject('失败');
//   }).then().then().then(data=>{
//     console.log(data);
//   },err=>{
//     console.log('err',err);
//   })

// Promise.resolve(new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve('ok');
//     }, 3000);
//   }))
//   .then(data=>{
//     console.log(data,'success')
//   })
//   .catch(err=>{
//     console.log(err,'error')
//   })

// Promise.resolve(456).finally(()=>{
//     return new Promise((resolve, reject)=>{
//       setTimeout(() => {
//           resolve(123)
//       }, 3000);
//     })
//   }).then(data=>{
//     console.log(data, 'success')
//   }).catch(err=>{
//     console.log(err, 'error')
//   })

let p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ok1');
    }, 1000);
  })
  
  let p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('ok2');
    }, 1000);
  })
  
  Promise.all([1,2,3,p1,p2]).then(data => {
    console.log('resolve', data);
  }, err => {
    console.log('reject', err);
  })
  
  
  
  
  
