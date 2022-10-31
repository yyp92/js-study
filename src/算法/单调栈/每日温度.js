/**
 * 739.每日温度
 * https://leetcode.cn/problems/daily-temperatures/
 * 
 * 请根据每日 气温 列表，重新生成一个列表。对应位置的输出为：要想观测到更高的气温，至少需要等待的天数。如果气温在这之后都不会升高，请在该位置用 0 来代替。
 * 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
 * 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。
 * 
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */

// 版本一
var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const res = Array(n).fill(0);
    // 递增栈：用于存储元素右面第一个比他大的元素下标
    const stack = [];  
    stack.push(0);

    for (let i = 1; i < n; i++) {
        // 栈顶元素
        const top = stack[stack.length - 1];

        // 情况一：当前遍历的元素T[i]小于栈顶元素T[st.top()]的情况
        if (temperatures[i] < temperatures[top]) {
            stack.push(i);
        } 
        // 情况二：当前遍历的元素T[i]等于栈顶元素T[st.top()]的情况
        else if (temperatures[i] === temperatures[top]) {
            stack.push(i);
        } 
        // 情况三：当前遍历的元素T[i]大于栈顶元素T[st.top()]的情况
        else {
            while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
                const top = stack.pop();
                res[top] = i - top;
            }

            stack.push(i);
        }
    }

    return res;
};


// 版本二
var dailyTemperatures = function(temperatures) {
    const n = temperatures.length;
    const res = Array(n).fill(0);
    // 递增栈：用于存储元素右面第一个比他大的元素下标
    const stack = [];  
    stack.push(0);

    for (let i = 1; i < n; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const top = stack.pop();
            res[top] = i - top;
        }

        stack.push(i);
    }

    return res;
};



// 测试
const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
console.log(dailyTemperatures(temperatures))