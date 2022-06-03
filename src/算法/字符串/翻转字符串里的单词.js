/**
 * 翻转字符串里的单词
 * 
 * 题意：
 *  给定一个字符串，逐个翻转字符串中的每个单词。
 * 
 * 示例 1：
 *  输入: "the sky is blue"
 *  输出: "blue is sky the"
 *  
 * 示例 2：
 *  输入: "  hello world! "
 *  输出: "world! hello"
 *  解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
 * 
 * 示例 3：
 *  输入: "a good   example"
 *  输出: "example good a"
 *  解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 * 
 * 
 * 思路:
 *  这道题目可以说是综合考察了字符串的多种操作。
 *  一些同学会使用split库函数，分隔单词，然后定义一个新的string字符串，最后再把单词倒序相加，那么这道题题目就是一道水题了，失去了它的意义。
 *  所以这里我还是提高一下本题的难度：不要使用辅助空间，空间复杂度要求为O(1)。
 *  不能使用辅助空间之后，那么只能在原字符串上下功夫了。
 *  想一下，我们将整个字符串都反转过来，那么单词的顺序指定是倒序了，只不过单词本身也倒序了，那么再把单词反转一下，单词不就正过来了。
 *  所以解题思路如下：
 *      移除多余空格
 *      将整个字符串反转
 *      将每个单词反转
 *  举个例子，源字符串为："the sky is blue "
 *      移除多余空格 : "the sky is blue"
 *      字符串反转："eulb si yks eht"
 *      单词反转："blue is sky the"
 * 
 *  那么使用双指针来移除冗余空格代码如下： fastIndex走的快，slowIndex走的慢，最后slowIndex就标记着移除多余空格后新字符串的长度。
 */
var reverseWords = function(s) {
    // 字符串转数组
    const strArr = Array.from(s);
    // 移除多余空格
    removeExtraSpaces(strArr);
    // 翻转
    reverse(strArr, 0, strArr.length - 1);
 
    let start = 0;
 
    for (let i = 0; i <= strArr.length; i++) {
        if (strArr[i] === ' ' || i === strArr.length) {
            // 翻转单词
            reverse(strArr, start, i - 1);
            start = i + 1;
        }
    }
 
    return strArr.join('');
};
 
// 删除多余空格
function removeExtraSpaces(strArr) {
    let slowIndex = 0;
    let fastIndex = 0;

    while(fastIndex < strArr.length) {
        // 移除开始位置和重复的空格
        if (strArr[fastIndex] === ' ' && (fastIndex === 0 || strArr[fastIndex - 1] === ' ')) {
            fastIndex++;
        }
        else {
            strArr[slowIndex++] = strArr[fastIndex++];
        }
    }

    // 移除末尾空格
    strArr.length = strArr[slowIndex - 1] === ' ' ? slowIndex - 1 : slowIndex;
}
 
// 翻转从 start 到 end 的字符
function reverse(strArr, start, end) {
    let left = start;
    let right = end;

    while(left < right) {
        // 交换
        [strArr[left], strArr[right]] = [strArr[right], strArr[left]];
        left++;
        right--;
    }
}
 



// 测试
const str1 = 'the sky is blue' // blue is sky the
const str2 = '  hello world! ' // world! hello
const str3 = 'a good   example' // example good a
console.log(reverseWords(str1))
console.log(reverseWords(str2))
console.log(reverseWords(str3))