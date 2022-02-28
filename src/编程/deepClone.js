const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';

const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];


function forEach(array, iteratee) {
    let index = -1;
    const length = array.length;
    while (++index < length) {
        iteratee(array[index], index);
    }
    return array;
}

function isObject(target) {
    const type = typeof target;
    return target !== null && (type === 'object' || type === 'function');
}

function getType(target) {
    return Object.prototype.toString.call(target);
}

function getInit(target) {
    const Ctor = target.constructor;
    return new Ctor();
}

function cloneSymbol(targe) {
    return Object(Symbol.prototype.valueOf.call(targe));
}

function cloneReg(targe) {
    const reFlags = /\w*$/;
    const result = new targe.constructor(targe.source, reFlags.exec(targe));
    result.lastIndex = targe.lastIndex;
    return result;
}

function cloneFunction(func) {
    const bodyReg = /(?<={)(.|\n)+(?=})/m;
    const paramReg = /(?<=\().+(?=\)\s+{)/;
    const funcString = func.toString();
    if (func.prototype) {
        const param = paramReg.exec(funcString);
        const body = bodyReg.exec(funcString);
        if (body) {
            if (param) {
                const paramArr = param[0].split(',');
                return new Function(...paramArr, body[0]);
            } else {
                return new Function(body[0]);
            }
        } else {
            return null;
        }
    } else {
        return eval(funcString);
    }
}

function cloneOtherType(targe, type) {
    const Ctor = targe.constructor;
    switch (type) {
        case boolTag:
        case numberTag:
        case stringTag:
        case errorTag:
        case dateTag:
            return new Ctor(targe);
        case regexpTag:
            return cloneReg(targe);
        case symbolTag:
            return cloneSymbol(targe);
        case funcTag:
            return cloneFunction(targe);
        default:
            return null;
    }
}

function deepClone(target, map = new WeakMap()) {
    // 克隆原始类型
    if (!isObject(target)) {
        return target;
    }

    // 初始化
    const type = getType(target);
    let cloneTarget;
    if (deepTag.includes(type)) {
        cloneTarget = getInit(target, type);
    }
    else {
        return cloneOtherType(target, type);
    }

    // 防止循环引用
    if (map.get(target)) {
        return map.get(target);
    }
    map.set(target, cloneTarget);

    // 克隆set
    if (type === setTag) {
        target.forEach(value => {
            cloneTarget.add(deepClone(value, map));
        });
        return cloneTarget;
    }

    // 克隆map
    if (type === mapTag) {
        target.forEach((value, key) => {
            cloneTarget.set(key, deepClone(value, map));
        });
        return cloneTarget;
    }

    // 克隆对象和数组
    const keys = type === arrayTag ? undefined : Object.keys(target);
    forEach(keys || target, (value, key) => {
        if (keys) {
            key = value;
        }
        cloneTarget[key] = deepClone(target[key], map);
    });

    return cloneTarget;
}


// 测试
const map = new Map();
map.set('key', 'value');
map.set('ConardLi', 'code秘密花园');

const set = new Set();
set.add('ConardLi');
set.add('code秘密花园');

const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8],
    empty: null,
    map,
    set,
    bool: new Boolean(true),
    num: new Number(2),
    str: new String(2),
    symbol: Object(Symbol(1)),
    date: new Date(),
    reg: /\d+/,
    error: new Error(),
    func1: () => {
        console.log('code秘密花园');
    },
    func2: function (a, b) {
        return a + b;
    }
};
console.log(deepClone(target))
// {
//     field1: 1,
//     field2: undefined,
//     field3: { child: 'child' },
//     field4: [ 2, 4, 8 ],
//     empty: null,
//     map: Map(2) { 'key' => 'value', 'ConardLi' => 'code秘密花园' },
//     set: Set(2) { 'ConardLi', 'code秘密花园' },
//     bool: [Boolean: true],
//     num: [Number: 2],
//     str: [String: '2'],
//     symbol: [Symbol: Symbol(1)],
//     date: 2022-02-28T09:49:18.377Z,
//     reg: /\d+/,
//     error: Error: Error
//         at cloneOtherType (/Users/yangyipeng/Desktop/study/project/js-study/src/tempCodeRunnerFile.js:83:20)
//         at deepClone (/Users/yangyipeng/Desktop/study/project/js-study/src/tempCodeRunnerFile.js:108:16)
//         at /Users/yangyipeng/Desktop/study/project/js-study/src/tempCodeRunnerFile.js:139:28
//         at forEach (/Users/yangyipeng/Desktop/study/project/js-study/src/tempCodeRunnerFile.js:23:9)
//         at deepClone (/Users/yangyipeng/Desktop/study/project/js-study/src/tempCodeRunnerFile.js:135:5)
//         at Object.<anonymous> (/Users/yangyipeng/Desktop/study/project/js-study/src/tempCodeRunnerFile.js:179:13)
//         at Module._compile (internal/modules/cjs/loader.js:1063:30)
//         at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
//         at Module.load (internal/modules/cjs/loader.js:928:32)
//         at Function.Module._load (internal/modules/cjs/loader.js:769:14),
//     func1: [Function (anonymous)],
//     func2: [Function: anonymous]
// }