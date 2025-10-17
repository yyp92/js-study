/**
 * * 飞地的数量
 * 
 * https://leetcode.cn/problems/number-of-enclaves/description/
 * 
 * 
 * 给你一个大小为 m x n 的二进制矩阵 grid ，其中 0 表示一个海洋单元格、1 表示一个陆地单元格。
 * 一次 移动 是指从一个陆地单元格走到另一个相邻（上、下、左、右）的陆地单元格或跨过 grid 的边界。
 * 返回网格中 无法 在任意次数的移动中离开网格边界的陆地单元格的数量。
 * 
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20220830100710.png
 * 输入：grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
 * 输出：3
 * 解释：有三个 1 被 0 包围。一个 1 没有被包围，因为它在边界上。
 * 
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20220830100742.png
 * 输入：grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
 * 输出：0
 * 解释：所有 1 都在边界上或可以到达边界。
 * 
 * 
 * 本题要求找到不靠边的陆地面积，那么我们只要从周边找到陆地然后 通过 dfs或者bfs 将周边靠陆地且相邻的陆地都变成海洋，然后再去重新遍历地图的时候，统计此时还剩下的陆地就可以了。
 */

const numEnclavesDfs = function (grid) {
    // 保存四个方向
    let dir = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 
    // 统计符合题目要求的陆地空格数量
    let count = 0
    let n = grid.length
    let m = grid[0].length
    
    let dfs = (grid, x, y) => {
        grid[x][y] = 0;
        count++;

        // 向四个方向遍历
        for (let i = 0; i < 4; i++) {
            let nextX = x + dir[i][0]
            let nextY = y + dir[i][1]

            // 越界了，直接跳过
            if (nextX < 0 || nextX >= grid.length || nextY < 0 || nextY >= grid[0].length) {
                continue;
            }

            // 不符合条件，不继续遍历
            if (grid[nextX][nextY] == 0) {
                continue;
            }

            dfs(grid, nextX, nextY);
        }

        return
    }

    // 从左侧边，和右侧边 向中间遍历
    for (let i = 0; i < n; i++) {
        if (grid[i][0] === 1) {
            dfs(grid, i, 0);
        }

        if (grid[i][m - 1] === 1) {
            dfs(grid, i, m - 1);
        }
    }

    // 从上边和下边 向中间遍历
    for (let j = 0; j < m; j++) {
        if (grid[0][j] === 1) {
            dfs(grid, 0, j);
        }

        if (grid[n - 1][j] === 1) {
            dfs(grid, n - 1, j);
        }
    }

    // 重置为0
    count = 0
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 1) {
                dfs(grid, i, j);
            }
        }
    }

    return count
};

const numEnclavesBfs = (grid) => {
    // 保存四个方向
    let dir = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 
    // 统计符合题目要求的陆地空格数量
    let count = 0
    let n = grid.length
    let m = grid[0].length

    let bfs = (grid, x, y) => {
        let queue = [];
        queue.push([x, y]);
        // 只要加入队列，立刻标记
        grid[x][y] = 0; 
        count++

        while(queue.length) {
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
                   
                if (grid[nextX][nextY] === 1) {
                    queue.push([nextX, nextY]);
                    count++;

                    // 只要加入队列立刻标记
                    grid[nextX][nextY] = 0;
                }
            }
        }
    }


    // 从左侧边，和右侧边 向中间遍历
    for (let i = 0; i < n; i++) {
        if (grid[i][0] === 1) {
            bfs(grid, i, 0);
        }

        if (grid[i][m - 1] === 1) {
            bfs(grid, i, m - 1);
        }
    }

    // 从上边和下边 向中间遍历
    for (let j = 0; j < m; j++) {
        if (grid[0][j] === 1) {
            bfs(grid, 0, j);
        }

        if (grid[n - 1][j] === 1) {
            bfs(grid, n - 1, j);
        }
    }

    count = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] === 1) {
                bfs(grid, i, j);
            }
        }
    }

    return count
}



// 测试
const grid1 = [
    [0, 0, 0, 0],
    [1, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 0, 0, 0]
]
const grid2 = [
    [0, 1, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0]
]

// console.log(numEnclavesDfs(grid1))
// console.log(numEnclavesDfs(grid2))

console.log(numEnclavesBfs(grid1))
console.log(numEnclavesBfs(grid2))
