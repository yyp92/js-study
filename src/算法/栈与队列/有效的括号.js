/**
 * 有效的括号
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
 * 
 * 思路:
 *  括号匹配是使用栈解决的经典问题。
 *  由于栈结构的特殊性，非常适合做对称匹配类的题目。
 *  首先要弄清楚，字符串里的括号不匹配有几种情况。
 *  一些同学，在面试中看到这种题目上来就开始写代码，然后就越写越乱。
 *  建议要写代码之前要分析好有哪几种不匹配的情况，如果不动手之前分析好，写出的代码也会有很多问题。
 *  先来分析一下 这里有三种不匹配的情况：
 *      第一种情况，字符串里左方向的括号多余了 ，所以不匹配。
 *      第二种情况，括号没有多余，但是 括号的类型没有匹配上。
 *      第三种情况，字符串里右方向的括号多余了，所以不匹配。
 * 
 *  第一种情况：已经遍历完了字符串，但是栈不为空，说明有相应的左括号没有右括号来匹配，所以return false
 *  第二种情况：遍历字符串匹配的过程中，发现栈里没有要匹配的字符。所以return false
 *  第三种情况：遍历字符串匹配的过程中，栈已经为空了，没有匹配的字符了，说明右括号没有找到对应的左括号return false
 *  那么什么时候说明左括号和右括号全都匹配了呢，就是字符串遍历完之后，栈是空的，就说明全都匹配了。
 *  分析完之后，代码其实就比较好写了，
 *  但还有一些技巧，在匹配左括号的时候，右括号先入栈，就只需要比较当前元素和栈顶相不相等就可以了，比左括号先入栈代码实现要简单的多了！
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