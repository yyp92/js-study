/**
 * 925.长按键入
 * https://leetcode.cn/problems/long-pressed-name/
 * 
 * 你的朋友正在使用键盘输入他的名字 name。偶尔，在键入字符 c 时，按键可能会被长按，而字符可能被输入 1 次或多次。
 * 你将会检查键盘输入的字符 typed。如果它对应的可能是你的朋友的名字（其中一些字符可能被长按），那么就返回 True。
 * 
 * 示例 1：
 *  输入：name = "alex", typed = "aaleex"
 *  输出：true
 *  解释：'alex' 中的 'a' 和 'e' 被长按。
 * 
 * 示例 2：
 *  输入：name = "saeed", typed = "ssaaedd"
 *  输出：false
 *  解释：'e' 一定需要被键入两次，但在 typed 的输出中不是这样。
 * 
 * 示例 3：
 *  输入：name = "leelee", typed = "lleeelee"
 *  输出：true
 * 
 * 示例 4：
 *  输入：name = "laiden", typed = "laiden"
 *  输出：true
 *  解释：长按名字中的字符并不是必要的。
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(1)
 */
var isLongPressedName = function(name, typed) {
    let i = 0
    let j = 0;
    const m = name.length
    const n = typed.length;

    while(i < m && j < n) {
        // 相同则同时向后匹配
        if (name[i] === typed[j]) { 
            i++
            j++;
        }
        // 不相同
        else {
            // 如果是第一位就不相同直接返回false
            if (j === 0) return false; 

            // 判断边界为n-1,若为n会越界,例如name:"kikcxmvzi" typed:"kiikcxxmmvvzzz"
            while(j < n - 1 && typed[j] === typed[j - 1]) j++;

            // j跨越重复项之后再次和name[i]匹配,相同则同时向后匹配
            if (name[i] === typed[j]) { 
                i++;
                j++;
            }
            else {
                return false;
            }
        }
    }
    // 说明name没有匹配完 例如 name:"pyplrzzzzdsfa" type:"ppyypllr"
    if (i < m) return false;

    // 说明type没有匹配完 例如 name:"alex" type:"alexxrrrrssda"
    while(j < n) {
        if (typed[j] === typed[j - 1]) {
            j++;
        }
        else {
            return false;
        }
    }

    return true;
};


// 测试
const name1 = "alex"
const typed1 = "aaleex"
const name2 = "saeed"
const typed2 = "ssaaedd"
const name3 = "leelee"
const typed3 = "lleeelee"
const name4 = "laiden"
const typed4 = "laiden"
const name5 = "alex"
const typed5 = "alexxrrrrssda"
// console.log(isLongPressedName(name1, typed1))
// console.log(isLongPressedName(name2, typed2))
// console.log(isLongPressedName(name3, typed3))
// console.log(isLongPressedName(name4, typed4))
console.log(isLongPressedName(name5, typed5))