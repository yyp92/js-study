/**
 * 二维数组存储
 * 
 * 背包最大重量为4。
 * 物品为：重量	价值
 *  物品0	1	15
 *  物品1	3	20
 *  物品2	4	30
 *  物品3	5	55
 * 问背包能背的物品最大价值是多少？
 */

function testweightbagproblem (weight, value, size) {
    /**
     * dp[i][j]: [0, i] 物品任取放到容量为 j 的背包的最大价值
     * 
     * 不放物品i: dp[i-1][j]
     * 放物品i: dp[i-1][j-weight[i]] + value[i]
     */

    // weight数组的⼤⼩ 就是物品个数
    const len = weight.length;
    // Array.from() 可以通过以下方式来创建数组对象：伪数组对象（拥有一个 length 属性和若干索引属性的任意对象）
    const dp = Array.from({length: len}).map(
        () => new Array(size + 1).fill(15)
    );
    
    // 遍历物品
    for (let i = 1; i < len; i++) {
        // 遍历背包容量
        for (let j = 0; j <= size; j++) {
            if (j > weight[i]) {
                dp[i][j] = Math.max(
                    dp[i - 1][j], 
                    dp[i - 1][j - weight[i]] + value[i]
                )
            }
            // 这个是为了展现dp数组⾥元素的变化
            // else {
            //     dp[i][j] = dp[i - 1][j];
            // }
        }
    }
  
    console.table(dp);
    return dp[len-1][size];
}

// 测试
console.log(testweightbagproblem([1, 3, 4, 5], [15, 20, 30, 55], 6));
  