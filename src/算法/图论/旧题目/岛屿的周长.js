/**
 * 岛屿的周长
 * 
 * https://leetcode.cn/problems/island-perimeter/
 * 
 * 给定一个 row x col 的二维网格地图 grid ，其中：grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域。
 * 网格中的格子 水平和垂直 方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。
 * 岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。
 * 
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20230829180848.png
 *  输入：grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
 *  输出：16
 *  解释：它的周长是上面图片中的 16 个黄色的边
 * 
 * 示例 2：
 *  输入：grid = [[1]]
 *  输出：4
 * 
 * 示例 3：
 *  输入：grid = [[1,0]]
 *  输出：4
 * 
 * 提示：
 *  row == grid.length
 *  col == grid[i].length
 *  1 <= row, col <= 100
 *  grid[i][j] 为 0 或 1
 */

/**
 * 解法一：
 * 遍历每一个空格，遇到岛屿，计算其上下左右的情况，遇到水域或者出界的情况，就可以计算边了。
 */
const islandPerimeter1 = (grid) => {
    // 保存四个方向
    let direction = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 
    let result = 0;

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                // 上下左右四个方向
                for (let k = 0; k < 4; k++) { 
                    // 计算周边坐标x,y      
                    const x = i + direction[k][0];
                    const y = j + direction[k][1]; 

                    if (
                        // i在边界上
                        x < 0

                        // i在边界上
                        || x >= grid.length 

                        // j在边界上    
                        || y < 0

                        // j在边界上                
                        || y >= grid[0].length 

                        // x,y位置是水域
                        || grid[x][y] == 0
                    ) {   
                        result++;
                    }
                }
            }
        }
    }

    return result;
}

/**
 * 解法二：
 * 计算出总的岛屿数量，因为有一对相邻两个陆地，边的总数就减2，那么在计算出相邻岛屿的数量就可以了。
 * result = 岛屿数量 * 4 - cover * 2;
 */
const islandPerimeter2 = (grid) => {
    // 陆地数量
    let sum = 0; 
    // 相邻数量   
    let cover = 0;  

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] === 1) {
                sum++;

                // 统计上边相邻陆地
                if (i - 1 >= 0 && grid[i - 1][j] === 1) {
                    cover++;
                }

                // 统计左边相邻陆地
                if (j - 1 >= 0 && grid[i][j - 1] === 1) {
                    cover++;
                }

                // ! 为什么没统计下边和右边？ 因为避免重复计算
            }
        }
    }

    return sum * 4 - cover * 2;
}



// 测试
const grid1 = [
    [0, 1, 0, 0],
    [1, 1, 1, 0],
    [0, 1, 0, 0],
    [1, 1, 0, 0]
]
const grid2 = [
    [1]
]
const grid3 = [
    [1, 0]
]

console.log(islandPerimeter1(grid1))
console.log(islandPerimeter1(grid2))
console.log(islandPerimeter1(grid3))

console.log(islandPerimeter2(grid1))
console.log(islandPerimeter2(grid2))
console.log(islandPerimeter2(grid3))
