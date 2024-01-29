/**
 * 不同路径 II
 * https://leetcode.cn/problems/unique-paths-ii/
 * 
 * 题意：
 *  一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 *  机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 *  现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
 *  网格中的障碍物和空位置分别用 1 和 0 来表示。
 * 
 * 示例1：
 *  输入：obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
 *  输出：2 
 *  解释：
 *      3x3 网格的正中间有一个障碍物。
 *      从左上角到右下角一共有 2 条不同的路径：
 *          向右 -> 向右 -> 向下 -> 向下
 *          向下 -> 向下 -> 向右 -> 向右
 * 示例2：
 *  输入：obstacleGrid = [[0,1],[0,0]]
 *  输出：1
 * 
 * 提示：
 *  m == obstacleGrid.length
 *  n == obstacleGrid[i].length
 *  1 <= m, n <= 100
 *  obstacleGrid[i][j] 为 0 或 1
 * 
 * 
 * 思路：
 *  62.不同路径，中我们已经详细分析了没有障碍的情况，有障碍的话，其实就是标记对应的dp table（dp数组）保持初始值(0)就可以了。
 * 
 * 
 * 动规五部曲：
 *  1.确定dp数组（dp table）以及下标的含义
 *      dp[i][j] ：表示从（0 ，0）出发，到(i, j) 有dp[i][j]条不同的路径。
 * 
 *  2.确定递推公式
 *      递推公式和（62题）不同路径一样，dp[i][j] = dp[i - 1][j] + dp[i][j - 1]。
 *      但这里需要注意一点，因为有了障碍，(i, j)如果就是障碍的话应该就保持初始状态（初始状态为0）。
 * 
 *  3.dp数组如何初始化
 *      因为从(0, 0)的位置到(i, 0)的路径只有一条，所以dp[i][0]一定为1，dp[0][j]也同理。
 *      但如果(i, 0) 这条边有了障碍之后，障碍之后（包括障碍）都是走不到的位置了，所以障碍之后的dp[i][0]应该还是初始值0。
 *      下标(0, j)的初始化情况同理。
 *      注意代码里for循环的终止条件，一旦遇到obstacleGrid[i][0] == 1的情况就停止dp[i][0]的赋值1的操作，dp[0][j]同理。
 *  4.确定遍历顺序
 *      从递归公式dp[i][j] = dp[i - 1][j] + dp[i][j - 1] 中可以看出，一定是从左到右一层一层遍历，这样保证推导dp[i][j]的时候，dp[i - 1][j] 和 dp[i][j - 1]一定是有数值。
 *  
 *  5.举例推导dp数组
 * 
 * 
 * 复杂度：
 *  时间复杂度：O(n × m)，n、m 分别为obstacleGrid 长度和宽度
 *  空间复杂度：O(n × m)
 * 
 * 优化后的复杂度：
 *  时间复杂度：O(n × m)，n、m 分别为obstacleGrid 长度和宽度
 *  空间复杂度：O(m)
 * 
 * 总结：
 *  但就算是做过62.不同路径，在做本题也会有感觉遇到障碍无从下手。
 *  其实只要考虑到，遇到障碍dp[i][j]保持0就可以了。
 *  也有一些小细节，例如：初始化的部分，很容易忽略了障碍之后应该都是0的情况。
 */

const uniquePathsWithObstacles = function(obstacleGrid) {
    // * dp[i][j] ：表示从（0 ，0）出发，到(i, j) 有dp[i][j]条不同的路径。
    const m = obstacleGrid.length
    const n = obstacleGrid[0].length
    const dp = new Array(m).fill().map(item => new Array(n).fill(0))
    
    // 初始化，第一行和第一列
    for (let i = 0; i < m && obstacleGrid[i][0] === 0; i++) {
        dp[i][0] = 1
    }
    for (let i = 0; i < n && obstacleGrid[0][i] === 0; i++) {
        dp[0][i] = 1
    }
    
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            // dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1]

            // 遇到障碍
            if (obstacleGrid[i][j] === 1) {
                continue
            }

            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }
        
    return dp[m - 1][n - 1]
};


/**
 * 优化后的版本(一维数组储存)
 * 
 * 时间复杂度：O(n × m)，n、m 分别为obstacleGrid 长度和宽度
 * 空间复杂度：O(m)} obstacleGrid 
 */
const uniquePathsWithObstaclesAfter = function(obstacleGrid) {
    // 如果起点就有障碍，则为0
    if (obstacleGrid[0][0] === 1) {
        return 0
    }

    const length = obstacleGrid[0].length
    const dp = Array(length).fill(0)

    // 初始化
    for (let i = 0; i < length; i++) {
        // 有障碍时
        if (obstacleGrid[0][i] === 1) {
            dp[i] = 0
        }
        // 起点无障碍
        else if (i === 0) {
            dp[i] = 1
        }
        // 无障碍时
        else {
            dp[i] = dp[i - 1]
        }
    }

    for (let i = 1; i < obstacleGrid.length; i++) {
        for (let j = 0; j < dp.length; j++) {
            if (obstacleGrid[i][j] === 1) {
                dp[j] = 0
            }
            else if (j !== 0) {
                dp[j] = dp[j] + dp[j - 1]
            }
        }
    }

    return dp.pop()
};


// 测试
const obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
const obstacleGrid1 = [[0,1],[0,0]]
// console.log(uniquePathsWithObstacles(obstacleGrid))
// console.log(uniquePathsWithObstacles(obstacleGrid1))

console.log(uniquePathsWithObstaclesAfter(obstacleGrid))
console.log(uniquePathsWithObstaclesAfter(obstacleGrid1))