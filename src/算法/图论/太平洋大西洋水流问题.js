/**
 * 太平洋大西洋水流问题
 * 
 * https://leetcode.cn/problems/pacific-atlantic-water-flow/
 * 
 * 有一个 m × n 的矩形岛屿，与 太平洋 和 大西洋 相邻。 “太平洋” 处于大陆的左边界和上边界，而 “大西洋” 处于大陆的右边界和下边界。
 * 这个岛被分割成一个由若干方形单元格组成的网格。给定一个 m x n 的整数矩阵 heights ， heights[r][c] 表示坐标 (r, c) 上单元格 高于海平面的高度 。
 * 岛上雨水较多，如果相邻单元格的高度 小于或等于 当前单元格的高度，雨水可以直接向北、南、东、西流向相邻单元格。水可以从海洋附近的任何单元格流入海洋。
 * 返回网格坐标 result 的 2D 列表 ，其中 result[i] = [ri, ci] 表示雨水从单元格 (ri, ci) 流动 既可流向太平洋也可流向大西洋 。
 * 
 * 示例 1：
 *  https://code-thinking-1253855093.file.myqcloud.com/pics/20230129103212.png
 *  输入: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
 *  输出: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
 * 
 * 示例 2：
 *  输入: heights = [[2,1],[1,2]]
 *  输出: [[0,0],[0,1],[1,0],[1,1]]
 * 
 * 提示：
 *  m == heights.length
 *  n == heights[r].length
 *  1 <= m, n <= 200
 *  0 <= heights[r][c] <= 10^5
 */

const pacificAtlanticDfs = (heights) => {
    // 保存四个方向
    let dir = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 
    const result = []
    let n = heights.length
    let m = heights[0].length

    // 记录从太平洋边出发，可以遍历的节点
    const pacific = new Array(heights.length).fill().map(() => Array(heights[0].length).fill(false))
    // 记录从大西洋出发，可以遍历的节点
    const atlantic = new Array(heights.length).fill().map(() => Array(heights[0].length).fill(false))


    const dfs = (heights, visited, x, y) => {
        if (visited[x][y]) {
            return;
        }

        visited[x][y] = true;

        // 向四个方向遍历
        for (let i = 0; i < 4; i++) { 
            const nextx = x + dir[i][0];
            const nexty = y + dir[i][1];

            // 超过边界
            if (nextx < 0 || nextx >= heights.length || nexty < 0 || nexty >= heights[0].length) {
                continue;
            }
                
            // 高度不合适，注意这里是从低向高判断
            if (heights[x][y] > heights[nextx][nexty]) {
                continue;
            } 

            dfs(heights, visited, nextx, nexty);
        }
        return;
    }


    // 从最上最下行的节点出发，向高处遍历
    for (let i = 0; i < n; i++) {
        // 遍历最上行，接触太平洋
        dfs (heights, pacific, i, 0); 

        // 遍历最下行，接触大西洋
        dfs (heights, atlantic, i, m - 1); 
    }

    // 从最左最右列的节点出发，向高处遍历
    for (let j = 0; j < m; j++) {
        // 遍历最左列，接触太平洋
        dfs (heights, pacific, 0, j); 

        // 遍历最右列，接触大西洋
        dfs (heights, atlantic, n - 1, j); 
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // 如果这个节点，从太平洋和大西洋出发都遍历过，就是结果
            if (pacific[i][j] && atlantic[i][j]) {
                result.push([i, j]);
            }
        }
    }

    return result;
}



const pacificAtlanticBfs = (heights) => {
    // 保存四个方向
    let directions = [[0, 1], [1, 0], [-1, 0], [0, -1]]; 
    const result = []
    let n = heights.length
    let m = heights[0].length
    // 太平洋队列
    let pacificQueue = [],
    // 大西洋队列
    atlanticQueue = [];

    // 记录从太平洋边出发，可以遍历的节点
    const pacificVisited = new Array(heights.length).fill().map(() => Array(heights[0].length).fill(false))
    // 记录从大西洋出发，可以遍历的节点
    const atlanticVisited = new Array(heights.length).fill().map(() => Array(heights[0].length).fill(false))


    // 从最上最下行的节点出发，向高处遍历
    for (let i = 0; i < n; i++) {
        // 最左边一列
        pacificQueue.push([i, 0]);
        pacificVisited[i][0] = true;

        // 最右边一列
        atlanticQueue.push([i, m - 1]);
        atlanticVisited[i][m - 1] = true;
    }

    // 从最左最右列的节点出发，向高处遍历
    for (let j = 0; j < m; j++) {
        // 最上边一行
        pacificQueue.push([0, j]);
        pacificVisited[0][j] = true;

        // 最下边一行
        atlanticQueue.push([n - 1, j]);
        atlanticVisited[n - 1][j] = true;
    }

    while (pacificQueue.length) {
        let [x, y] = pacificQueue.shift();

        for (let dir of directions) {
            let curX = x + dir[0]
            let curY = y + dir[1];

            // 没有越界  之前没有访问过  并且当前单元格高度比上一个单元格高度要高
            if (
                curX >= 0 &&
                curX < n &&
                curY >= 0 &&
                curY < m &&
                !pacificVisited[curX][curY] &&
                heights[curX][curY] >= heights[x][y]
            ) {
                pacificQueue.push([curX, curY]);
                pacificVisited[curX][curY] = true;
            }
        }
    }

    while (atlanticQueue.length) {
        let [x, y] = atlanticQueue.shift();

        for (let dir of directions) {
            let curX = x + dir[0]
            let curY = y + dir[1];

            // 没有越界  之前没有访问过  并且当前单元格高度比上一个单元格高度要高
            if (
                curX >= 0 &&
                curX < n &&
                curY >= 0 &&
                curY < m &&
                !atlanticVisited[curX][curY] &&
                heights[curX][curY] >= heights[x][y]
            ) {
                atlanticQueue.push([curX, curY]);
                atlanticVisited[curX][curY] = true;
            }
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // 如果这个节点，从太平洋和大西洋出发都遍历过，就是结果
            if (atlanticVisited[i][j] && pacificVisited[i][j]) {
                result.push([i, j]);
            }
        }
    }

    return result;
}




// 测试
const heights1 = [
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4]
]
const heights2 = [
    [2, 1],
    [1, 2]
]

// console.log(pacificAtlanticDfs(heights1))
// console.log(pacificAtlanticDfs(heights2))

console.log(pacificAtlanticBfs(heights1))
console.log(pacificAtlanticBfs(heights2))
