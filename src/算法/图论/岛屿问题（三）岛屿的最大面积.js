/**
 * * 岛屿的最大面积
 * https://kamacoder.com/problempage.php?pid=1172
 * 
 * 题目描述:
 *      给定一个由 1（陆地）和 0（水）组成的矩阵，计算岛屿的最大面积。岛屿面积的计算方式为组成岛屿的陆地的总数。岛屿由水平方向或垂直方向上相邻的陆地连接而成，并且四周都是水域。你可以假设矩阵外均被水包围。
 * 
 * 输入描述:
 *      第一行包含两个整数 N, M，表示矩阵的行数和列数。后续 N 行，每行包含 M 个数字，数字为 1 或者 0，表示岛屿的单元格。
 * 
 * 输出描述:
 *      输出一个整数，表示岛屿的最大面积。如果不存在岛屿，则输出 0。
 * 
 * 输入示例：
 *      4 5
 *      1 1 0 0 0
 *      1 1 0 0 0
 *      0 0 1 0 0
 *      0 0 0 1 1
 * 
 * 输出示例:
 *      4
 * 
 * 提示信息:
 *      https://file1.kamacoder.com/i/algo/20240517103410.png
 * 
 * 
 * 数据范围：
 *      1 <= M, N <= 50
 */

const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;

// 地图
let graph
// 地图大小
let N, M
// 访问过的节点 
let visited
// 最大岛屿面积
let result = 0
// 岛屿内节点数
let count = 0
// 方向
const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]]


// 读取输入，初始化地图
const initGraph = async () => {
    let line = await readline();
    [N, M] = line.split(' ').map(Number);
    graph = new Array(N).fill(0).map(() => new Array(M).fill(0))
    visited = new Array(N).fill(false).map(() => new Array(M).fill(false))

    for (let i = 0; i < N; i++) {
        line = await readline()
        line = line.split(' ').map(Number)

        for (let j = 0; j < M; j++) {
            graph[i][j] = line[j]
        }
    }
}



/**
 * * 广搜版
 * @description: 从(x, y)开始广度优先遍历
 * @param {*} graph 地图
 * @param {*} visited 访问过的节点
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @return {*}
 */
const bfs = (graph, visited, x, y) => {
    let queue = []
    queue.push([x, y])
    count++
    // 只要加入队列就立刻标记为访问过
    visited[x][y] = true

    while (queue.length) {
        let [xx, yy] = queue.shift()

        for (let i = 0; i < 4; i++) {
            let nextx = xx + dir[i][0]
            let nexty = yy + dir[i][1]

            // 越界了，直接跳过
            if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue

            if (!visited[nextx][nexty] && graph[nextx][nexty] === 1) {
                queue.push([nextx, nexty])
                count++
                visited[nextx][nexty] = true
            }
        }
    }

}

(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 统计最大岛屿面积
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            // 遇到没有访问过的陆地
            if (!visited[i][j] && graph[i][j] === 1) {
                // 重新计算面积
                count = 0

                // 广度优先遍历，统计岛屿内节点数，并将岛屿标记为已访问
                bfs(graph, visited, i, j)

                // 更新最大岛屿面积
                result = Math.max(result, count)
            }
        }
    }

    console.log(result)
})()




/**
 * * 深搜版
 * @description: 从(x, y)开始深度优先遍历
 * @param {*} graph 地图
 * @param {*} visited 访问过的节点
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @return {*}
 */
const dfs = (graph, visited, x, y) => {
    for (let i = 0; i < 4; i++) {
        let nextx = x + dir[i][0]
        let nexty = y + dir[i][1]

        // 越界了，直接跳过
        if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue

        if (!visited[nextx][nexty] && graph[nextx][nexty] === 1) {
            count++
            visited[nextx][nexty] = true
            dfs(graph, visited, nextx, nexty)
        }
    }
}

(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 统计最大岛屿面积
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            // 遇到没有访问过的陆地
            if (!visited[i][j] && graph[i][j] === 1) { 
                // 重新计算面积
                count = 1
                visited[i][j] = true

                // 深度优先遍历，统计岛屿内节点数，并将岛屿标记为已访问
                dfs(graph, visited, i, j)

                // 更新最大岛屿面积
                result = Math.max(result, count)
            }
        }
    }

    console.log(result)
})()
