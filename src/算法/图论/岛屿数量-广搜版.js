/**
 * 岛屿数量-广搜版
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

    let bfs = (grid, visited, x, y) => {
        let queue = [];

        queue.push([x, y]);
        // 只要加入队列，立刻标记
        visited[x][y] = true;

        while (queue.length) {
            // 取出队列头部元素
            let top = queue.shift();

            // 因为是四个方向，所以为4
            for (let i = 0; i < 4; i++) {
                let nextX = top[0] + dir[i][0]
                let nextY = top[1] + dir[i][1]

                // 越界了，直接跳过
                if (nextX < 0 || nextX >= grid.length || nextY < 0 || nextY >= grid[0].length) {
                    continue;
                }
                   
                // 判断四个方向的是否访问过 且 为岛屿
                if (!visited[nextX][nextY] && grid[nextX][nextY] === "1") {
                    queue.push([nextX, nextY])
                    // 只要加入队列立刻标记
                    visited[nextX][nextY] = true
                }
            }
        }
    }

    let visited = new Array(grid.length).fill().map(() => Array(grid[0].length).fill(false))
    let res = 0

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (!visited[i][j] && grid[i][j] === "1") {
                // 遇到没访问过的陆地，+1
                res++;

                // 将与其链接的陆地都标记上 true
                bfs(grid, visited, i, j);
            }
        }
    }

    return res
};


// 测试
const grid = [
    ['1', '1', '0', '0', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
]
console.log(numIslands(grid))
