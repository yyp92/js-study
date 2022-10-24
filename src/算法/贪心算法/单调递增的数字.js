/**
 * 738.单调递增的数字
 * 
 * 给定一个非负整数 N，找出小于或等于 N 的最大的整数，同时这个整数需要满足其各个位数上的数字是单调递增。
 * （当且仅当每个相邻位数上的数字 x 和 y 满足 x <= y 时，我们称这个整数是单调递增的。）
 * 
 * 示例 1:
 *  输入: N = 10
 *  输出: 9
 * 
 * 示例 2:
 *  输入: N = 1234
 *  输出: 1234
 * 
 * 示例 3:
 *  输入: N = 332
 *  输出: 299
 * 
 * 说明: N 是在 [0, 10^9] 范围内的一个整数。
 * 
 * 时间复杂度：$O(n)$，n 为数字长度
 * 空间复杂度：$O(n)$，需要一个字符串，转化为字符串操作更方便
 */
const monotoneIncreasingDigits = function(n) {
    n = n.toString()
    n = n.split('').map(item => {
        return +item
    })

    // flag用来标记赋值9从哪里开始
    // 设置为这个默认值，为了防止第二个for循环在flag没有被赋值的情况下执行
    let flag = Infinity
    
    for (let i = n.length - 1; i > 0; i--) {
        // 前一个大于后一位, 前一位减1，此时i的位置变成9
        if (n[i - 1] > n[i]) {
            flag = i
            n[i - 1] -= 1
            n[i] = 9
        }
    }

    // 把flag位置之后的都变为9
    for (let i = flag; i < n.length; i++) {
        n[i] = 9
    }

    n = n.join('')
    return +n
}



// 测试
const n1 = 10
const n2 = 1234
const n3 = 332
console.log(monotoneIncreasingDigits(n1))
console.log(monotoneIncreasingDigits(n2))
console.log(monotoneIncreasingDigits(n3))