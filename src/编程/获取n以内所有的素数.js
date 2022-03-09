/**
 * 获取n以内所有的素数
 * https://leetcode-cn.com/problems/count-primes/solution/mei-ju-ai-shi-shai-xian-xing-shai-qi-shu-shai-5xin/
 * 
 * 定义：约数只有1和本身的整数称为质数，或称素数。
 * 
 * 输入：n = 10
 * 输出：4
 * 解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
 * 
 * 输入：n = 0
 * 输出：0
 * 
 * 输入：n = 1
 * 输出：0
 */

/**
 * 枚举
 * 
 * 质数是只能被1和自身整除的数
 * 从[0, n)枚举数，如果其能被[2, n - 1]中任意数整除，不是质数
 */
//  var isPrime = function(n) {
//     // for(var i = 2; i < n; i++) {
//     //     if (n % i === 0) {
//     //         return false
//     //     }
//     // }

//     for(var i = 2, max = Math.sqrt(n); i <= max; i++) {
//         if (n % i === 0) {
//             return false
//         }
//     }

//     return true
// }
// function countPrimes(num) {
//     let count = 0

//     for (let i = 2; i < num; i++) {
//         if (isPrime(i)) {
//             console.log('----i, ', i)
//             count++
//         }
//     }

//     return count
// }


/**
 * 埃氏筛
 * 
 * 质数的倍数是合数。n以内，从2起，顺序标记质数的倍数为合数
 * 每找到一个质数，结果+1。返回结果。
 */
// var countPrimes = function(n) {
//     var r = 0

//     for(var i = 2, isPrime = new Int8Array(n).fill(1); i < n; i++) {
//         if(isPrime[i]) {
//             r++

//             for (var j = i * i; j < n; j += i) {
//                 isPrime[j] = 0
//             }
//         }
//     }

//     return r
// };


/**
 * 奇数筛 - 最优
 * 质数一定是奇数，偶数一定不是质数。只用在奇数范围标记合数，未标记是质数
 * 奇数 乘以 偶数 一定是 偶数。只用奇数 乘以 奇数，确保在奇数范围内标记
 */
var countPrimes = function(n) {
    var isCom = new Int8Array(n)
    var b = Math.sqrt(n) 
    var r = n >= 2 ? 1 : 0

    // 确保是奇数
    for (var i = 3; i < n; i += 2) {
        if (!isCom[i]) {
            r++

            // 取出奇数中的合数
            if (i <= b) {
                for (var j = i; i * j < n; j += 2) {
                    isCom[i * j] = 1
                }
            }
        }
    }

    return r
};

// 测试
// 2, 3, 5, 7
console.log(countPrimes(20))
// console.log(countPrimes(10))
// console.log(countPrimes(0))
// console.log(countPrimes(1))
// console.log(countPrimes(2))