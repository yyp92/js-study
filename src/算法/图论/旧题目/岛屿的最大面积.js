/**
 * 岛屿的最大面积
 * 
 * https://leetcode.cn/problems/max-area-of-island/
 * 
 * 给你一个大小为 m x n 的二进制矩阵 grid 。
 * 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。
 * 岛屿的面积是岛上值为 1 的单元格的数目。
 * 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。
 * 
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20220729111528.png
 * 
 * 输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
 * 输出：6
 * 解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
 */

/**
 * DFS
 * 
 * dfs只处理下一个节点，即在主函数遇到岛屿就计数为1，dfs处理接下来的相邻陆地
 */
const maxAreaOfIslandDfs = function (grid) {
    // 四个方向
    let dir = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 
    let count = 0
    let result  = 0
    let visited = new Array(grid.length).fill().map(() => Array(grid[0].length).fill(false))
    
    let dfs = (grid, visited, x, y) => {
        for (let i = 0; i < 4; i++) {
            let nextX = x + dir[i][0]
            let nextY = y + dir[i][1]

            // 越界了，直接跳过
            if (nextX < 0 || nextX >= grid.length || nextY < 0 || nextY >= grid[0].length) {
                continue;
            }

            // 没有访问过的 同时 是陆地的
            if (!visited[nextX][nextY] && grid[nextX][nextY] === 1) {
                visited[nextX][nextY] = true
                count++;
                dfs(grid, visited, nextX, nextY)
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (!visited[i][j] && grid[i][j] === 1) {
                // 因为dfs处理下一个节点，所以这里遇到陆地了就先计数，dfs处理接下来的相邻陆地
                count = 1
                visited[i][j] = true;

                // 将与其链接的陆地都标记上 true
                dfs(grid, visited, i, j);
                result = Math.max(result, count);
            }
        }
    }

    return result
};


/**
 * BFS
 */
const maxAreaOfIslandBfs = (grid) => {
    // 四个方向
    let dir = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 
    let count = 0
    let result  = 0
    let visited = new Array(grid.length).fill().map(() => Array(grid[0].length).fill(false))

    let bfs = (grid, visited, x, y) => {
        let queue = [];
        queue.push([x, y]);
        // 只要加入队列，立刻标记
        visited[x][y] = true;
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
                   
                // 节点没有被访问过且是陆地
                if (!visited[nextX][nextY] && grid[nextX][nextY] === 1) {
                    // 只要加入队列立刻标记
                    visited[nextX][nextY] = true

                    count++

                    queue.push([nextX, nextY])
                }
            }
        }
    }


    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (!visited[i][j] && grid[i][j] === 1) {
                count = 0

                // 将与其链接的陆地都标记上 true
                bfs(grid, visited, i, j);
                result = Math.max(result, count);
            }
        }
    }

    return result
}



// 测试
const grid = [
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
]
console.log(maxAreaOfIslandDfs(grid))
console.log(maxAreaOfIslandBfs(grid))

