/**
 * 202.快乐数
 * https://leetcode.cn/problems/happy-number/
 * 
 * 编写一个算法来判断一个数 n 是不是快乐数。
 * 「快乐数」定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。如果 可以变为  1，那么这个数就是快乐数。
 * 如果 n 是快乐数就返回 True ；不是，则返回 False 。
 * 
 * 示例：
 *  输入：19
 *  输出：true
 *  解释：
 *      1^2 + 9^2 = 82
 *      8^2 + 2^2 = 68
 *      6^2 + 8^2 = 100
 *      1^2 + 0^2 + 0^2 = 1
 */
var isHappy = function (n) {
    let m = new Map()

    // 取数值各个位上的单数之和
    const getSum = (num) => {
        let sum = 0

        while (num) {
            sum += (num % 10) ** 2
            num = Math.floor(num / 10)
        }

        return sum
    }

    while (true) {
        // n出现过，证明已陷入无限循环
        if (m.has(n)) return false
        if (n === 1) return true

        m.set(n, 1)
        n = getSum(n)
    }
}

// 方法二：使用环形链表的思想 说明出现闭环 退出循环
var isHappy1 = function(n) {
    if (getN(n) == 1) return true;
    let a = getN(n), b = getN(getN(n));
    // 如果 a === b 
    while (b !== 1 && getN(b) !== 1 && a !== b) {
        a = getN(a);
        b = getN(getN(b));
    }
    return b === 1 || getN(b) === 1 ;
};

// 方法三：使用Set()更简洁
/**
 * @param {number} n
 * @return {boolean}
 */

var getSum = function (n) {
    let sum = 0;
    while (n) {
        sum += (n % 10) ** 2;
        n =  Math.floor(n/10);
    }
    return sum;
}
var isHappy2 = function(n) {
    let set = new Set();   // Set() 里的数是惟一的
    // 如果在循环中某个值重复出现，说明此时陷入死循环，也就说明这个值不是快乐数
    while (n !== 1 && !set.has(n)) {
        set.add(n);
        n = getSum(n);
    }
    return n === 1;
};

// 方法四：使用Set()，求和用reduce
var isHappy3 = function(n) {
    let set = new Set();
    let totalCount;
    while(totalCount !== 1) {
        let arr = (''+(totalCount || n)).split('');
        totalCount = arr.reduce((total, num) => {
            return total + num * num
        }, 0)
        if (set.has(totalCount)) {
            return false;
        }
        set.add(totalCount);
    }
    return true;
};


// 测试
const num = 19
console.log(isHappy(num))