/**
 * 反转字符串II
 * 
 * 题意：
 *  给定一个字符串 s 和一个整数 k，你需要对从字符串开头算起的每隔 2k 个字符的前 k 个字符进行反转。
 *  如果剩余字符少于 k 个，则将剩余字符全部反转。
 *  如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
 * 
 * 示例:
 *  输入: s = "abcdefg", k = 2
 *  输出: "bacdfeg"
 * 
 * 思路：
 *  这道题目其实也是模拟，实现题目中规定的反转规则就可以了。
 *  一些同学可能为了处理逻辑：每隔2k个字符的前k的字符，写了一堆逻辑代码或者再搞一个计数器，来统计2k，再统计前k个字符。
 *  其实在遍历字符串的过程中，只要让 i += (2 * k)，i 每次移动 2 * k 就可以了，然后判断是否需要有反转的区间。
 *  因为要找的也就是每2 * k 区间的起点，这样写，程序会高效很多。
 *  所以当需要固定规律一段一段去处理字符串的时候，要想想在在for循环的表达式上做做文章。
 */
const reverseStr = function(s, k) {
    const len = s.length;
    let resArr = s.split(""); 

    for (let i = 0; i < len; i += 2 * k) {
        let l = i - 1
        // 如果剩余字符少于 k 个，则将剩余字符全部反转>
        // 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
        let r = i + k > len ? len : i + k;

        // 双指针，前后移动进行交换
        while(++l < --r) {
            [resArr[l], resArr[r]] = [resArr[r], resArr[l]];
        }
    }

    return resArr.join("");
};


// 测试
const s = "abcdefg"
const k = 2
console.log(reverseStr(s, k))