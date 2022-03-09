/**
 * 回文数
 * 给你一个整数 x ，如果 x 是一个回文整数，返回 true ；否则，返回 false 。
 * 回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 * 例如，121 是回文，而 123 不是。
 */

/**
 * 余数重组
 * 
 * 首先判定绝对不符合条件的数字，即负数和末位为0且不为0的数；
 * 将x放入新元素s，对s不断取余数，并在temp中乘10，直到s/10向下取整为0，即完成数字翻转；
 * 对比新数temp和x是否相同。
 */
// function isPalindrome(x) {
//     if(x < 0 || (x % 10 == 0 && x !== 0)) return false
//     let temp = 0, s = x

//     while(s){
//         temp = temp * 10 + s % 10
//         s = Math.floor(s/10)
//     }

//     return x === temp
// };


// 反转字符串
// function isPalindrome(x) {
//     return x.toString() === x.toString().split('').reverse().join('')
// };


/**
 * 双指针
 * 将数字转换为字符串，利用JS的语义转化。
 * 两个指针分别从最左侧和最右侧开始，比较两数字是否相同。运算至中间处n即可。
 */
function isPalindrome(x) {
    let temp = x.toString()
    const n = Math.floor(temp.length/2)

    for (let i = 0; i < n; i++) {
        if (temp[i] !== temp[temp.length - i - 1]) {
            return false
        }
    }

    return true
};

const x = 121
const x1 = -121
const x2 = 10
console.log('---x:', isPalindrome(x), isPalindrome(x1), isPalindrome(x2))