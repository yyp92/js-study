/**
 * 有效的括号
 * https://leetcode.cn/problems/valid-parentheses/
 * 
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 * 
 * 有效字符串需满足：
 *  左括号必须用相同类型的右括号闭合。
 *  左括号必须以正确的顺序闭合。
 *  注意空字符串可被认为是有效字符串。
 * 
 * 示例 1:
 *  输入: "()"
 *  输出: true
 * 
 * 示例 2:
 *  输入: "()[]{}"
 *  输出: true
 * 
 * 示例 3:
 *  输入: "(]"
 *  输出: false
 * 
 * 示例 4:
 *  输入: "([)]"
 *  输出: false
 * 
 * 示例 5:
 *  输入: "{[]}"
 *  输出: true
 *  
 */
const isValid = function (s) {
    const stack = [];

    for (let i = 0; i < s.length; i++) {
      let c = s[i];

      switch (c) {
        case '(':
          stack.push(')');
          break;

        case '[':
          stack.push(']');
          break;

        case '{':
          stack.push('}');
          break;

        default:
          if (c !== stack.pop()) {
            return false;
          }
      }
    }

    return stack.length === 0;
};

// 简化版本
const isValid1 = function(s) {
    const stack = []
    const map = {
        "(":")",
        "{":"}",
        "[":"]"
    };

    for (const x of s) {
        if (x in map) {
            stack.push(x);
            continue;
        };

        if (map[stack.pop()] !== x) return false;
    }

    return !stack.length;
};



// 测试
const str1 = "()" // true
const str2 = "()[]{}" // true
const str3 = "(]" // false
const str4 = "([)]" // false
const str5 = "{[]}" // true
console.log(isValid(str1))
console.log(isValid(str2))
console.log(isValid(str3))
console.log(isValid(str4))
console.log(isValid(str5))