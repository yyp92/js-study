/**
 * 多重背包
 * 
 * 有N种物品和一个容量为V 的背包。第i种物品最多有Mi件可用，每件耗费的空间是Ci ，价值是Wi 。求解将哪些物品装入背包可使这些物品的耗费的空间 总和不超过背包容量，且价值总和最大。
 * 多重背包和01背包是非常像的， 为什么和01背包像呢？
 * 每件物品最多有Mi件可用，把Mi件摊开，其实就是一个01背包问题了。
 * 
 * 例如：
 * 背包最大重量为10。
 * 物品为：
重量	价值	数量
物品0	1	15	2
物品1	3	20	3
物品2	4	30	2

问背包能背的物品最大价值是多少？
和如下情况有区别么？

重量	价值	数量
物品0	1	15	1
物品0	1	15	1
物品1	3	20	1
物品1	3	20	1
物品1	3	20	1
物品2	4	30	1
物品2	4	30	1

毫无区别，这就转成了一个01背包问题了，且每个物品只用一次。

时间复杂度：O(m × n × k)，m：物品种类个数，n背包容量，k单类物品数量
 */

function testMultiPack() {
    const bagSize = 10;
    const weightArr = [1, 3, 4]
    const valueArr = [15, 20, 30]
    const amountArr = [2, 3, 2];
    const goodsNum = weightArr.length;
    const dp = new Array(bagSize + 1).fill(0);

    // 遍历物品
    for (let i = 0; i < goodsNum; i++) {
      // 遍历物品个数
      for (let j = 0; j < amountArr[i]; j++) {
        // 遍历背包容量
        for (let k = bagSize; k >= weightArr[i]; k--) {
          dp[k] = Math.max(dp[k], dp[k - weightArr[i]] + valueArr[i]);
        }
      }
    }
    console.log(dp);

    return dp[bagSize]
}

testMultiPack();