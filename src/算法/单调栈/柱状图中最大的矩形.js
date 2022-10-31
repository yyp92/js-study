/**
 * 84.柱状图中最大的矩形
 * https://leetcode.cn/problems/largest-rectangle-in-histogram/
 * 
 * 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
 * 求在该柱状图中，能够勾勒出来的矩形的最大面积。
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20210803220437.png
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20210803220506.png
 */

// 动态规划 js中运行速度最快
var largestRectangleArea = function(heights) {
    const len = heights.length;
    const minLeftIndex = new Array(len);
    const maxRigthIndex = new Array(len);

    // 记录每个柱子 左边第一个小于该柱子的下标
    // 注意这里初始化，防止下面while死循环
    minLeftIndex[0] = -1; 
    for (let i = 1; i < len; i++) {
        let t = i - 1;

        // 这里不是用if，而是不断向左寻找的过程
        while(t >= 0 && heights[t] >= heights[i]) {
            t = minLeftIndex[t];
        }

        minLeftIndex[i] = t;
    }

    // 记录每个柱子 右边第一个小于该柱子的下标
    // 注意这里初始化，防止下面while死循环
    maxRigthIndex[len - 1] = len; 
    for (let i = len - 2; i >= 0; i--){
        let t = i + 1;

        // 这里不是用if，而是不断向右寻找的过程
        while(t < len && heights[t] >= heights[i]) {
            t = maxRigthIndex[t];
        }
       
        maxRigthIndex[i] = t;
    }

    // 求和
    let maxArea = 0;
    for (let i = 0; i < len; i++){
        let sum = heights[i] * (maxRigthIndex[i] - minLeftIndex[i] - 1);
        maxArea = Math.max(maxArea , sum);
    }

    return maxArea;
};

// 单调栈
var largestRectangleArea1 = function(heights) {
    let maxArea = 0;
    const stack = [];
    // 数组头部加入元素0 数组尾部加入元素0
    heights = [0, ...heights, 0]; 

    for (let i = 0; i < heights.length; i++) {
        // 情况三：当前遍历的元素heights[i]大于栈顶元素heights[st.top()]的情况
        if (heights[i] > heights[stack[stack.length - 1]]) {
            stack.push(i);
        } 
        // 情况二：当前遍历的元素heights[i]等于栈顶元素heights[st.top()]的情况
        else if(heights[i] === heights[stack[stack.length - 1]]){
            // 这个可以加，可以不加，效果一样，思路不同
            stack.pop(); 
            stack.push(i);
        } 
        // 情况一：当前遍历的元素heights[i]小于栈顶元素heights[st.top()]的情况
        else {
            // 当前bar比栈顶bar矮
            while(heights[i] < heights[stack[stack.length - 1]]) {
                // 栈顶元素出栈，并保存栈顶bar的索引
                const stackTopIndex = stack.pop();
                let w = i - stack[stack.length - 1] - 1;
                let h = heights[stackTopIndex]
                // 计算面积，并取最大面积
                maxArea = Math.max(maxArea, w * h);
            }

            // 当前bar比栈顶bar高了，入栈
            stack.push(i);
        }
    }

    return maxArea;
};

//单调栈 简洁
var largestRectangleArea1 = function(heights) {
    let maxArea = 0;
    const stack = [];
    // 数组头部加入元素0 数组尾部加入元素0
    heights = [0, ...heights, 0]; 
    
    for(let i = 0; i < heights.length; i++){ 
        // 只用考虑情况一 当前遍历的元素heights[i]小于栈顶元素heights[stack[stack.length-1]]]的情况
        // 当前bar比栈顶bar矮
        while(heights[i] < heights[stack[stack.length - 1]]) {
            // 栈顶元素出栈，并保存栈顶bar的索引
            const stackTopIndex = stack.pop();
            let w = i - stack[stack.length - 1] - 1;
            let h = heights[stackTopIndex]
            // 计算面积，并取最大面积
            maxArea = Math.max(maxArea, w * h);
        }

        // 当前bar比栈顶bar高了，入栈
        stack.push(i);
    }

    return maxArea;
};


// 测试
const height1 = [2, 1, 5, 6, 2, 3]
const height2 = [2, 4]
console.log(largestRectangleArea(height1))
console.log(largestRectangleArea(height2))
console.log(largestRectangleArea1(height1))
console.log(largestRectangleArea1(height2))
