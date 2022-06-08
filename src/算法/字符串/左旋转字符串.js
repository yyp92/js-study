/**
 * 左旋转字符串
 * 
 * 题意：
 *  字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。
 * 
 * 示例 1：
 *  输入: s = "abcdefg", k = 2
 *  输出: "cdefgab"
 * 
 * 示例 2：
 *  输入: s = "lrloseumgh", k = 6
 *  输出: "umghlrlose"
 * 
 * 限制：
 *  1 <= k < s.length <= 10000
 * 
 * 
 * 思路：
 *  为了让本题更有意义，提升一下本题难度：不能申请额外空间，只能在本串上操作。
 *  不能使用额外空间的话，模拟在本串操作要实现左旋转字符串的功能还是有点困难的。
 *  那么我们可以想一下上一题目字符串：花式反转还不够！ 中讲过，使用整体反转+局部反转就可以实现，反转单词顺序的目的。
 *  这道题目也非常类似，依然可以通过局部反转+整体反转 达到左旋转的目的。
 *  具体步骤为：
 *      反转区间为前n的子串
 *      反转区间为n到末尾的子串
 *      反转整个字符串
 *  最后就可以得到左旋n的目的，而不用定义新的字符串，完全在本串上操作。
 * 
 * 
 * 总结：
 *  此时我们已经反转好多次字符串了，来一起回顾一下吧。
 *  在这篇文章344.反转字符串 ，第一次讲到反转一个字符串应该怎么做，使用了双指针法。
 *  然后发现541. 反转字符串II ，这里开始给反转加上了一些条件，当需要固定规律一段一段去处理字符串的时候，要想想在在for循环的表达式上做做文章。
 *  后来在151.翻转字符串里的单词 中，要对一句话里的单词顺序进行反转，发现先整体反转再局部反转 是一个很妙的思路。
 *  最后再讲到本题，本题则是先局部反转再 整体反转，与151.翻转字符串里的单词 类似，但是也是一种新的思路。
 * 
 */

// 在原字符串上操作
const reverseLeftWords = function (s, n) {
    /** Utils */
    function reverseWords(strArr, start, end) {
        let temp;

        while (start < end) {
            temp = strArr[start];
            strArr[start] = strArr[end];
            strArr[end] = temp;

            start++;
            end--;
        }
    }

    /** Main code */
    let strArr = s.split('');
    let length = strArr.length;

    reverseWords(strArr, 0, length - 1);
    reverseWords(strArr, 0, length - n - 1);
    reverseWords(strArr, length - n, length - 1);

    return strArr.join('');
};

const reverseLeftWords1 = function(s, n) {
    const length = s.length;
    let i = 0;

    while (i < length - n) {
      s = s[length - 1] + s;
      i++;
    }
    console.log('==s', s)
    return s.slice(0, length);
};
  

// 测试
const s1 = "abcdefg" // cdefgab
const k1 = 2
const s2 = "lrloseumgh" // umghlrlose
const k2 = 6
console.log(reverseLeftWords(s1, k1))
console.log(reverseLeftWords(s2, k2))
console.log(reverseLeftWords1(s1, k1))
console.log(reverseLeftWords1(s2, k2))