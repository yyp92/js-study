/**
 * 函数重载
 * 
 * Typescript的类型检查器通常不能证明关于代码的每个可证明属性。在这种情况下,表达式 a[0] string | number 因为它要么来自一个字符串数组,要么来自一个数字数组;同样地 a[1] 具有类型 .重要的是,Typescript并没有跟踪到这两个事实 字符串|编号，所以Typescript认为这是一个 (string | number) + (string | number) ,这是一个类型错误。人类可能会认为它更像 (string + string) | (number + number) ,但这种情况不能在Typescript的类型检查算法中表示。
 */

// function f(a: string | number, b: string | number) {
//     if (typeof a === 'string') {
//       return a + ':' + b; // no error but b can be number!
//     } else {
//       return a + b; // error as b can be number | string
//     }
// }

function f(a: string, b: string): string;
function f(a: number, b: number): number;
function f(a: string | number, b: string | number) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a + ':' + b;
  }
  else {
    return a + b; 
  }
}

f(2, 3); // Ok
// f(1, 'a'); // Error
// f('a', 2); // Error
f('a', 'b'); // Ok
