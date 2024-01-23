/**
 * 带取消功能的延迟函数
 */

// 1. 简版延迟
const delay1 = (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}

(async() => {
    await delay1(1000);
    console.log('输出这句');
})();



// 2. 传递 value 参数作为结果
const delay2 = (ms, { value } = {}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value);
        }, ms);
    });
}

(async() => {
    const result = await delay2(1000, { value: '我是yy' });
    console.log('输出结果', result);
})();



// 3. willResolve 参数决定成功还是失败
const delay3 = (ms, {value, willResolve} = {}) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(willResolve){
                resolve(value);
            }
            else{
                reject(value);
            }
        }, ms);
    });
}

(async() => {
    try{
        const result = await delay3(1000, { value: '我是yy', willResolve: false });
        console.log('永远不会输出这句');
    }
    catch(err){
        console.log('输出结果', err);
    }
})();



// 4. 一定时间范围内随机获得结果
const randomInteger = (minimum, maximum) => Math.floor((Math.random() * (maximum - minimum + 1)) + minimum);

const createDelay = ({willResolve}) => (ms, {value} = {}) => {
    return new Promise((relove, reject) => {
        setTimeout(() => {
            if(willResolve){
                relove(value);
            }
            else{
                reject(value);
            }
        }, ms);
    });
}

const createWithTimers = () => {
    const delay = createDelay({willResolve: true});
    delay.reject = createDelay({willResolve: false});
    delay.range = (minimum, maximum, options) => delay(randomInteger(minimum, maximum), options);

    return delay;
}

const delay4 = createWithTimers();

(async() => {
    try{
        const result = await delay4.reject(1000, { value: '我是yy', willResolve: false });
        console.log('永远不会输出这句');
    }
    catch(err){
        console.log('输出结果', err);
    }

    const result2 = await delay4.range(10, 20000, { value: '我是yy，range' });
    console.log('输出结果', result2);
})();



// 5. 提前清除
const randomInteger1 = (minimum, maximum) => Math.floor((Math.random() * (maximum - minimum + 1)) + minimum);

const createDelay1 = ({willResolve}) => (ms, {value} = {}) => {
    let timeoutId;
    let settle;

    const delayPromise = new Promise((resolve, reject) => {
        settle = () => {
            if(willResolve){
                resolve(value);
            }
            else{
                reject(value);
            }
        }

        timeoutId = setTimeout(settle, ms);
    });

    delayPromise.clear = () => {
        clearTimeout(timeoutId);
        timeoutId = null;
        settle();
    };

    return delayPromise;
}

const createWithTimers1 = () => {
    const delay = createDelay1({willResolve: true});
    delay.reject = createDelay1({willResolve: false});
    delay.range = (minimum, maximum, options) => delay(randomInteger1(minimum, maximum), options);

    return delay;
}

const delay5 = createWithTimers1();

(async () => {
    const delayedPromise = delay5(1000, {value: '我是yy'});

    setTimeout(() => {
        delayedPromise.clear();
    }, 300);

    // 300 milliseconds later
    console.log(await delayedPromise);
    //=> '我是yy'
})();



// 6. 取消功能
const randomInteger2 = (minimum, maximum) => Math.floor((Math.random() * (maximum - minimum + 1)) + minimum);

const createAbortError = () => {
    const error = new Error('Delay aborted');
    error.name = 'AbortError';

    return error;
};

const createDelay2 = ({willResolve}) => (ms, {value, signal} = {}) => {
    if (signal && signal.aborted) {
        return Promise.reject(createAbortError());
    }

    let timeoutId;
    let settle;
    let rejectFn;

    const signalListener = () => {
        clearTimeout(timeoutId);
        rejectFn(createAbortError());
    }

    const cleanup = () => {
        if (signal) {
            signal.removeEventListener('abort', signalListener);
        }
    };

    const delayPromise = new Promise((resolve, reject) => {
        settle = () => {
            cleanup();

            if (willResolve) {
                resolve(value);
            } else {
                reject(value);
            }
        };

        rejectFn = reject;
        timeoutId = setTimeout(settle, ms);
    });
    
    if (signal) {
        signal.addEventListener('abort', signalListener, {once: true});
    }

    delayPromise.clear = () => {
        clearTimeout(timeoutId);
        timeoutId = null;
        settle();
    };

    return delayPromise;
}

const createWithTimers2 = () => {
    const delay = createDelay2({willResolve: true});
    delay.reject = createDelay2({willResolve: false});
    delay.range = (minimum, maximum, options) => delay(randomInteger2(minimum, maximum), options);

    return delay;
}
const delay6 = createWithTimers2();

(async () => {
    const abortController = new AbortController();

    setTimeout(() => {
        abortController.abort();
    }, 500);

    try {
        await delay6(1000, {signal: abortController.signal});
    } 
    catch (error) {
        // 500 milliseconds later
        console.log(error.name)
        //=> 'AbortError'
    }
})();



// 7. 自定义 clearTimeout 和 setTimeout 函数
const randomInteger3 = (minimum, maximum) => Math.floor((Math.random() * (maximum - minimum + 1)) + minimum);

const createAbortError3 = () => {
    const error = new Error('Delay aborted');
    error.name = 'AbortError';

    return error;
};

const createDelay3 = ({
    clearTimeout: defaultClear, 
    setTimeout: set, 
    willResolve
}) => (ms, {value, signal} = {}) => {
    if (signal && signal.aborted) {
        return Promise.reject(createAbortError());
    }

    let timeoutId;
    let settle;
    let rejectFn;
    const clear = defaultClear || clearTimeout;

    const signalListener = () => {
        clear(timeoutId);
        rejectFn(createAbortError());
    }

    const cleanup = () => {
        if (signal) {
            signal.removeEventListener('abort', signalListener);
        }
    };

    const delayPromise = new Promise((resolve, reject) => {
        settle = () => {
            cleanup();

            if (willResolve) {
                resolve(value);
            }
            else {
                reject(value);
            }
        };

        rejectFn = reject;
        timeoutId = (set || setTimeout)(settle, ms);
    });
    
    if (signal) {
        signal.addEventListener('abort', signalListener, {once: true});
    }

    delayPromise.clear = () => {
        clear(timeoutId);
        timeoutId = null;
        settle();
    };

    return delayPromise;
}

const createWithTimers3 = clearAndSet => {
    const delay = createDelay3({...clearAndSet, willResolve: true});
    delay.reject = createDelay3({...clearAndSet, willResolve: false});
    delay.range = (minimum, maximum, options) => delay(randomInteger3(minimum, maximum), options);

    return delay;
}
const delay7 = createWithTimers3();
delay7.createWithTimers3 = createWithTimers3;

const customDelay = delay7.createWithTimers3({clearTimeout, setTimeout});

(async() => {
    const result = await customDelay(100, {value: '我是yy'});

    // Executed after 100 milliseconds
    console.log(result);
    //=> '我是yy'
})();
