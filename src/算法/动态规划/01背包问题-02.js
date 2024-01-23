/**
 * 滚动数组
 * 
 * 背包最大重量为4。
 * 物品为：重量	价值
 *  物品0	1	15
 *  物品1	3	20
 *  物品2	4	30
 *  物品3	5	55
 * 问背包能背的物品最大价值是多少？
 */

function testWeightBagProblem(wight, value, size) {
    /**
     * dp[j]: 容量为 j 的背包所背最大价值
     */

    const len = wight.length;
    const dp = Array(size + 1).fill(0);

    // 物品
    for (let i = 1; i <= len; i++) {
        // 背包 - 倒序遍历
        for (let j = size; j >= wight[i - 1]; j--) {
            dp[j] = Math.max(dp[j], value[i - 1] + dp[j - wight[i - 1]]);
        }
    }
    console.log(dp)

    return dp[size];
}


// 测试
console.log(testWeightBagProblem([1, 3, 4, 5], [15, 20, 30, 55], 6));
