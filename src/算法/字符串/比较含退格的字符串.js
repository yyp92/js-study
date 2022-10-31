/**
 * 844.比较含退格的字符串
 * https://leetcode.cn/problems/backspace-string-compare/
 * 
 * 给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，判断二者是否相等，并返回结果。 # 代表退格字符。
 * 注意：如果对空文本输入退格字符，文本继续为空。
 * 
 * 示例 1：
 *  输入：S = "ab#c", T = "ad#c"
 *  输出：true
 *  解释：S 和 T 都会变成 “ac”。
 * 
 * 示例 2：
 *  输入：S = "ab##", T = "c#d#"
 *  输出：true
 *  解释：S 和 T 都会变成 “”。
 * 
 * 示例 3：
 *  输入：S = "a##c", T = "#a#c"
 *  输出：true
 *  解释：S 和 T 都会变成 “c”。
 * 
 * 示例 4：
 *  输入：S = "a#c", T = "b"
 *  输出：false
 *  解释：S 会变成 “c”，但 T 仍然是 “b”。
 */
// 双栈
var backspaceCompare1 = function(s, t) {
    const arrS = [], arrT = []; // 数组作为栈使用
    for (let char of s) {
        char === '#' ? arrS.pop() : arrS.push(char);
    }

    for (let char of t) {
        char === '#' ? arrT.pop() : arrT.push(char);
    }

    return arrS.join('') === arrT.join(''); // 比较两个字符串是否相等
};

// 双栈精简
var backspaceCompare1 = function(s, t) {
    const getString = s => {
        let arrS = [];
        for(let char of s){
            char === '#' ? arrS.pop() : arrS.push(char);
        }
        return arrS.join('');
    }
    return getString(s) === getString(t);
};

// 双指针
var backspaceCompare = function(s, t) {
    let sSkipNum = 0; // 记录s的#数量
    let tSkipNum = 0; // 记录t的#数量
    let i = s.length - 1, j = t.length - 1;

    while(true) {
        // 从后向前，消除s的#
        while(i >= 0) { 
            if (s[i] === '#') sSkipNum++;
            else {
                if (sSkipNum > 0) sSkipNum--;
                else break;
            }

            i--;
        }

        // 从后向前，消除t的#
        while (j >= 0) { 
            if (t[j] === '#') tSkipNum++;
            else {
                if (tSkipNum > 0) tSkipNum--;
                else break;
            }

            j--;
        }

        // 后半部分#消除完了，接下来比较s[i] != t[j]
        if (i < 0 || j < 0) break; // s 或者t 遍历到头了
        if (s[i] !== t[j]) {
        }

        i--;j--;
    }

    // 说明s和t同时遍历完毕
    if (i == -1 && j == -1) return true;
    return false;
}


// 测试
const S1 = "ab#c"
const T1 = "ad#c"
const S2 = "ab##"
const T2 = "c#d#"
const S3 = "a##c"
const T3 = "#a#c"
const S4 = "a#c"
const T4 = "b"
console.log(backspaceCompare(S1, T1))
console.log(backspaceCompare(S2, T2S2))
console.log(backspaceCompare(S3, T3))
console.log(backspaceCompare(S4, T4))