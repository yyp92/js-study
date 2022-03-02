/**
 * 数组扁平
 * https://segmentfault.com/a/1190000021366004
 * 
 * 
 * 多维数组转为一维数组
 * 
 * 实现思路：
 *  第一个要解决的就是遍历数组的每一个元素；
 *  第二个要解决的就是判断元素是否是数组；
 *  第三个要解决的就是将数组的元素展开一层；
 * 
 * 判断元素是数组的方案
 *  instanceof
 *  constructor
 *  Object.prototype.toString
 *  isArray
 * 
 * 将数组的元素展开一层的方案
 *  扩展运算符 + concat
 *  concat + apply
 *  toString + split
 * 
 * callee 是 arguments 对象的一个属性。它可以用于引用该函数的函数体内当前正在执行的函数。这在函数的名称是未知时很有用，例如在没有名称的函数表达式 (也称为“匿名函数”)内。
 */

const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }, , ,];

// concat + 递归
// function flat(arr) {
//     let arrResult = [];

//     arr.forEach(item => {
//         if (Array.isArray(item)) {
//             // 递归
//             arrResult = arrResult.concat(arguments.callee(item));
//             // 或者用扩展运算符
//             // arrResult.push(...arguments.callee(item));
//         }
//         else {
//             arrResult.push(item);
//         }
//     });
    
//     return arrResult;
// }
// console.log(flat(arr))
// [1, 2, 3, 4, 1, 2, 3, 1, 2, 3, 1, 2, 3, 5, "string", { name: "弹铁蛋同学" }];


// 用 reduce 实现 flat 函数
// const flat = arr => {
//     return arr.reduce((pre, cur) => {
//         return pre.concat(Array.isArray(cur) ? flat(cur) : cur);
//     }, []);
// }
// console.log(flat(arr))


// 使用栈的思想实现 flat 函数
// function flat(arr) {
//     const result = []; 
//     const stack = [].concat(arr);  // 将数组元素拷贝至栈，直接赋值会改变原数组
    
//     // 如果栈不为空，则循环遍历
//     while (stack.length !== 0) {
//         const val = stack.pop();

//         if (Array.isArray(val)) {
//             stack.push(...val); // 如果是数组再次入栈，并且展开了一层
//         }
//         else {
//             result.unshift(val); // 如果不是数组就将其取出来放入结果数组中
//         }
//     }

//     return result;
// }
// console.log(flat(arr))


// 通过传入整数参数控制“拉平”层数
// function flat(arr, num = 1) {
//     return num > 0
//         ? arr.reduce(
//             (pre, cur) =>
//                 pre.concat(Array.isArray(cur) ? flat(cur, num - 1) : cur),
//             []
//         )
//         : arr.slice();
// }
// console.log(flat(arr))
  

// 使用 Generator 实现 flat 函数
// function* flat(arr, num = 1) {
//     for (const item of arr) {
//         if (Array.isArray(item) && num > 0) {
//             yield* flat(item, num - 1);
//         } 
//         else {
//             yield item;
//         }
//     }
// }
// console.log(flat(arr), [...flat(arr, Infinity)])


// 实现在原型链上重写 flat 函数
// Array.prototype.concat.apply降维合并 --> Array.prototype.concat.apply([],[2,[3,4]]) 
// Array.prototype.fakeFlat = function(num = 1) {
//     if (!Number(num) || Number(num) < 0) {
//         return this;
//     }

//     // 获得调用 fakeFlat 函数的数组
//     let arr = this.concat();

//     while (num > 0) {           
//         if (arr.some(x => Array.isArray(x))) {
//             // 数组中还有数组元素的话并且 num > 0，继续展开一层数组 
//             arr = [].concat.apply([], arr);
//         }
//         else {
//             // 数组中没有数组元素并且不管 num 是否依旧大于 0，停止循环。
//             break;
//         }

//         num--;
//     }

//     return arr;
// };
// // console.log(arr.fakeFlat(Infinity))
// console.log(arr.concat.apply([], arr))


// 考虑数组空位的情况
Array.prototype.fakeFlat = function(num = 1) {
    if (!Number(num) || Number(num) < 0) {
        return this;
    }

    // reduce + 递归
    // let arr = [].concat(this);
    // return num > 0
    //     ? arr.reduce(
    //         (pre, cur) => pre.concat(Array.isArray(cur) ? cur.fakeFlat(--num) : cur),
    //         []
    //     )
    //     : arr.slice();

    // foEach + 递归
    let arr = [];
    this.forEach(item => {
        if (Array.isArray(item)) {
            arr = arr.concat(item.fakeFlat(--num));
        }
        else {
            arr.push(item);
        }
    });
    return arr;
};
console.log(arr.fakeFlat(Infinity))

