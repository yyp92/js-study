/**
 * 最大人工岛
 * 
 * https://leetcode.cn/problems/making-a-large-island/
 * 
 * 给你一个大小为 n x n 二进制矩阵 grid 。最多 只能将一格 0 变成 1 。
 * 返回执行此操作后，grid 中最大的岛屿面积是多少？
 * 岛屿 由一组上、下、左、右四个方向相连的 1 形成。
 * 
 * 示例 1:
 *  输入: grid = [[1, 0], [0, 1]]
 *  输出: 3
 *  解释: 将一格0变成1，最终连通两个小岛得到面积为 3 的岛屿。
 * 
 * 示例 2:
 *  输入: grid = [[1, 1], [1, 0]]
 *  输出: 4
 *  解释: 将一格0变成1，岛屿的面积扩大为 4。
 * 
 * 示例 3:
 *  输入: grid = [[1, 1], [1, 1]]
 *  输出: 4
 *  解释: 没有0可以让我们变成1，面积依然为 4。
 */

const largestIslandDfs = (grid) => {
    const n = grid.length
    const m = grid[0].length
    // 保存四个方向
    let dir = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 
    let visited = new Array(grid.length)
        .fill()
        .map(() => Array(grid[0].length)
        .fill(false))
    const gridNum = {}
    // 记录每个岛屿的编号, 因为岛屿已经是0和1，所以从2开始
    let mark = 2; 
    // 标记是否整个地图都是陆地
    let isAllGrid = true; 
    // 记录最后结果
    let result = 0; 
    // 标记访问过的岛屿
    let visitedGrid = new Set()

    const dfs = (grid, visited, x, y, mark) => {
        // 终止条件：访问过的节点 或者 遇到海水
        if (visited[x][y] || grid[x][y] == 0) {
            return;
        }

        // 标记访问过
        visited[x][y] = true;
        // 给陆地标记新标签 
        grid[x][y] = mark; 
        count++;

        for (let i = 0; i < 4; i++) {
            let nextx = x + dir[i][0];
            let nexty = y + dir[i][1];

            // 越界了，直接跳过
            if (nextx < 0 || nextx >= n || nexty < 0 || nexty >= m) {
                continue;
            } 

            dfs(grid, visited, nextx, nexty, mark);
        }
    }

    // 一次遍历地图，得出各个岛屿的面积，并做编号记录。可以使用map记录，key为岛屿编号，value为岛屿面积 
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (grid[i][j] == 0) {
                isAllGrid = false;
            }

            if (!visited[i][j] && grid[i][j] == 1) {
                count = 0;

                // 将与其链接的陆地都标记上 true
                dfs(grid, visited, i, j, mark);
                // 记录每一个岛屿的面积
                gridNum[mark] = count; 
                // 记录下一个岛屿编号
                mark++; 
            }
        }
    }

    if (isAllGrid) return n * m; // 如果都是陆地，返回全面积


    /**
     * 在遍历地图，遍历0的方格（因为要将0变成1），并统计该1（由0变成的1）周边岛屿面积，将其相邻面积相加在一起，遍历所有 0 之后，就可以得出 选一个0变成1 之后的最大面积。
     */
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // 记录连接之后的岛屿数量
            let count = 1; 
            // 每次使用时，清空
            visitedGrid.clear()

            if (grid[i][j] === 0) {
                for (let k = 0; k < 4; k++) {
                    // 计算相邻坐标
                    let neari = i + dir[k][1]; 
                    let nearj = j + dir[k][0];

                    // 越界了，直接跳过
                    if (neari < 0 || neari >= n || nearj < 0 || nearj >= m) {
                        continue;
                    }

                    // 添加过的岛屿不要重复添加
                    if (visitedGrid.has(grid[neari][nearj])) {
                        continue;
                    }
                     
                    // 把相邻四面的岛屿数量加起来
                    count += gridNum[grid[neari][nearj]];
                    // 标记该岛屿已经添加过
                    visitedGrid.add(grid[neari][nearj]); 
                }
            }

            result = Math.max(result, count);
        }
    }

    return result
}


// todo 待完成
const largestIslandBfs = (grid) => {
    const n = grid.length
    const m = grid[0].length

    // 保存四个方向
    let dir = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 

    let result = 0

    return result
}




// 测试
const grid1 = [
    [1, 0],
    [0, 1]
]
const grid2 = [
    [1, 1],
    [1, 0]
]
const grid3 = [
    [1, 1],
    [1, 1]
]

console.log(largestIslandDfs(grid1))
console.log(largestIslandDfs(grid2))
console.log(largestIslandDfs(grid3))

// console.log(largestIslandBfs(grid1))
// console.log(largestIslandBfs(grid2))
// console.log(largestIslandBfs(grid3))
