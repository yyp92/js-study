/**
 * 岛屿数量-深搜版
 * 
 * https://leetcode.cn/problems/number-of-islands/
 * 
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
 * 此外，你可以假设该网格的四条边均被水包围。
 * 
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20220726093256.png
 * 
 * 提示：
 *  m == grid.length
 *  n == grid[i].length
 *  1 <= m, n <= 300
 *  grid[i][j] 的值为 '0' 或 '1'
 */

const numIslands = function (grid) {
    // 四个方向
    let dir = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 

    let dfs = (grid, visited, x, y) => {
        for (let i = 0; i < 4; i++) {
            let nextX = x + dir[i][0]
            let nextY = y + dir[i][1]

            // 越界了，直接跳过
            if (nextX < 0 || nextX >= grid.length || nextY < 0 || nextY >= grid[0].length) {
                continue;
            }
                
            // 没有访问过的同时是陆地的
            if (!visited[nextX][nextY] && grid[nextX][nextY] === "1") {
                visited[nextX][nextY] = true
                dfs(grid, visited, nextX, nextY)
            }
        }
    }
    let visited = new Array(grid.length).fill().map(() => new Array(grid[0].length).fill(false))

    let res = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (!visited[i][j] && grid[i][j] === "1") {
                // 遇到没访问过的陆地，+1
                res++;

                visited[i][j] = true;

                // 将与其链接的陆地都标记上 true
                dfs(grid, visited, i, j);
            }
        }
    }

    return res
};



// 测试
const grid1 = [
    ['1', '1', '1', '1', '0'],
    ['1', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
]
const grid2 = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
]

// 1
console.log(numIslands(grid1))
// 3
console.log(numIslands(grid2))

