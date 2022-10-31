/**
 * 42.接雨水
 * https://leetcode.cn/problems/trapping-rain-water/
 * 
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。
 * 
 * 示例 1：
 *  https://code-thinking-1253855093.cos.ap-guangzhou.myqcloud.com/pics/20210713205038.png
 *  输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
 *  输出：6
 *  解释：上面是由数组 [0,1,0,2,1,0,1,3,2,1,2,1] 表示的高度图，在这种情况下，可以接 6 个单位的雨水（蓝色部分表示雨水）。
 * 
 * 示例 2：
 *  输入：height = [4,2,0,3,2,5]
 *  输出：9
 */

// 双指针
var trap1 = function(height) {
    const len = height.length;
    let sum = 0;

    for (let i = 0; i < len; i++) {
        // 第一个柱子和最后一个柱子不接雨水
        if (i == 0 || i == len - 1) {
            continue;
        }

        // 记录右边柱子的最高高度
        let rHeight = height[i]; 
        // 记录左边柱子的最高高度
        let lHeight = height[i]; 

        for (let r = i + 1; r < len; r++) {
            if (height[r] > rHeight) {
                rHeight = height[r];
            }
        }
        for (let l = i - 1; l >= 0; l--) {
            if (height[l] > lHeight) {
                lHeight = height[l];
            }
        }
        
        let h = Math.min(lHeight, rHeight) - height[i];
        if (h > 0) {
            sum += h;
        }
    }

    return sum;
};

// 动态规划
var trap2 = function(height) {
    const len = height.length;
    if (len <= 2) return 0;

    const maxLeft = new Array(len).fill(0);
    const maxRight = new Array(len).fill(0);

    // 记录每个柱子左边柱子最大高度
    maxLeft[0] = height[0];
    for (let i = 1; i < len; i++) {
        maxLeft[i] = Math.max(height[i], maxLeft[i - 1]);
    }

    // 记录每个柱子右边柱子最大高度
    maxRight[len - 1] = height[len - 1];
    for (let i = len - 2; i >= 0; i--) {
        maxRight[i] = Math.max(height[i], maxRight[i + 1]);
    }

    // 求和
    let sum = 0;
    for (let i = 0; i < len; i++){
        let count = Math.min(maxLeft[i], maxRight[i]) - height[i];
        if (count > 0) sum += count;
    }

    return sum;
};

// 单调栈 js数组作为栈
var trap = function(height) {
    const len = height.length;
    // 可以不加
    if (len <= 2) return 0; 
    // 存着下标，计算的时候用下标对应的柱子高度
    const st = [];
    st.push(0);
    let sum = 0;

    for (let i = 1; i < len; i++) {
        // 情况一: 如果当前遍历的元素（柱子）高度小于栈顶元素的高度，就把这个元素加入栈中，因为栈里本来就要保持从小到大的顺序（从栈头到栈底）。
        if (height[i] < height[st[st.length - 1]]) {
            st.push(i);
        }

        // 情况二: 如果当前遍历的元素（柱子）高度等于栈顶元素的高度，要跟更新栈顶元素，因为遇到相相同高度的柱子，需要使用最右边的柱子来计算宽度。
        if (height[i] == height[st[st.length - 1]]) {  
            // 其实这一句可以不加，效果是一样的，但处理相同的情况的思路却变了。
            st.pop(); 
            st.push(i);
        }
        // 情况三: 如果当前遍历的元素（柱子）高度大于栈顶元素的高度，此时就出现凹槽了
        else { 
            // 注意这里是while
            while (st.length !== 0 && height[i] > height[st[st.length - 1]]) { 
                let mid = st[st.length - 1];
                st.pop();

                if (st.length !== 0) {
                    let h = Math.min(height[st[st.length - 1]], height[i]) - height[mid];
                    // 注意减一，只求中间宽度
                    let w = i - st[st.length - 1] - 1; 
                    sum += h * w;
                }
            }

            st.push(i);
        }
    }

    return sum;
};

//单调栈 简洁版本 只处理情况三
var trap = function(height) {
    const len = height.length;

    // 可以不加
    if (len <= 2) return 0; 

    // 存着下标，计算的时候用下标对应的柱子高度
    const st = [];
    st.push(0);
    let sum = 0;

    // 只处理的情况三，其实是把情况一和情况二融合了
    for (let i = 1; i < len; i++) { 
        // 注意这里是while
        while (st.length !== 0 && height[i] > height[st[st.length - 1]]) { 
            let mid = st[st.length - 1];
            st.pop();

            if (st.length !== 0) {
                let h = Math.min(height[st[st.length - 1]], height[i]) - height[mid];
                // 注意减一，只求中间宽度
                let w = i - st[st.length - 1] - 1; 
                sum += h * w;
            }
        }

        st.push(i);
    }

    return sum;
};



// 测试
const height1 = [0,1,0,2,1,0,1,3,2,1,2,1]
const height2 = [4,2,0,3,2,5]
console.log(trap1(height1))
console.log(trap1(height2))
console.log(trap2(height1))
console.log(trap2(height2))
console.log(trap(height1))
console.log(trap(height2))