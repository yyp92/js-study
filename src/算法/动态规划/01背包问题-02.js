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

function testWeightBagProblem(weight, value, size) {
    /**
     * * dp[j]: 容量为 j 的背包所背最大价值
     */

    const len = weight.length;
    const dp = new Array(size + 1).fill(0);

    // 物品
    for (let i = 0; i < len; i++) {
        // 背包 - 倒序遍历
        // * 倒序遍历是为了保证物品i只被放入一次
        for (let j = size; j >= weight[i]; j--) {
            dp[j] = Math.max(dp[j], dp[j - weight[i]] + value[i]);
        }
    }
    console.log(dp)

    return dp[size];
}


// 测试
console.log(testWeightBagProblem([1, 3, 4, 5], [15, 20, 30, 55], 6));
