/**
 * 删除字符串中的所有相邻重复项
 * 
 * 给出由小写字母组成的字符串 S，重复项删除操作会选择两个相邻且相同的字母，并删除它们。
 * 在 S 上反复执行重复项删除操作，直到无法继续删除。
 * 在完成所有重复项删除操作后返回最终的字符串。答案保证唯一。
 * 
 * 示例：
 *  输入："abbaca"
 *  输出："ca"
 *  解释：例如，在 "abbaca" 中，我们可以删除 "bb" 由于两字母相邻且相同，这是此时唯一可以执行删除操作的重复项。之后我们得到字符串 "aaca"，其中又只有 "aa" 可以执行重复项删除操作，所以最后的字符串为 "ca"。
 * 
 * 提示：
 *  1 <= S.length <= 20000
 *  S 仅由小写英文字母组成。
 * 
 * 
 * 递归的实现就是：每一次递归调用都会把函数的局部变量、参数值和返回地址等压入调用栈中，然后递归返回的时候，从栈顶弹出上一次递归的各项参数，所以这就是递归为什么可以返回上一层位置的原因。
 * 
 * 思路：
 *  本题要删除相邻相同元素，其实也是匹配问题，相同左元素相当于左括号，相同右元素就是相当于右括号，匹配上了就删除。
 *  那么再来看一下本题：可以把字符串顺序放到一个栈中，然后如果相同的话 栈就弹出，这样最后栈里剩下的元素都是相邻不相同的元素了。
 *  从栈中弹出剩余元素，此时是字符串ac，因为从栈里弹出的元素是倒序的，所以在对字符串进行反转一下，就得到了最终的结果。
 */

// 使用栈
const removeDuplicates = function(s) {
    const stack = [];

    for (const x of s) {
        let c = null;

        if (stack.length && x === (c = stack.pop())) continue;
        c && stack.push(c);

        stack.push(x);
    }

    return stack.join("");
};


// 原地解法（双指针模拟栈）
const removeDuplicates1 = function(s) {
    s = [...s];
    // 指向栈顶元素的下标
    let top = -1;

    for (let i = 0; i < s.length; i++) {
        // top === -1 即空栈
        if (top === -1 || s[top] !== s[i]) {
            // 入栈
            s[++top] = s[i];
        }
        else {
            // 推出栈
            top--;
        }
    }

    // 栈顶元素下标 + 1 为栈的长度
    s.length = top + 1;

    return s.join('');
};



// 测试
const s = "abbaca"
console.log(removeDuplicates(s))
console.log(removeDuplicates1(s))
