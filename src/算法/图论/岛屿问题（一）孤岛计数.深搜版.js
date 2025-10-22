/**
 * * 99. 岛屿数量
 * https://kamacoder.com/problempage.php?pid=1171
 * 
 * 题目描述：
 *      给定一个由 1（陆地）和 0（水）组成的矩阵，你需要计算岛屿的数量。岛屿由水平方向或垂直方向上相邻的陆地连接而成，并且四周都是水域。你可以假设矩阵外均被水包围。
 * 
 * 输入描述：
 *      第一行包含两个整数 N, M，表示矩阵的行数和列数。
 *      后续 N 行，每行包含 M 个数字，数字为 1 或者 0。
 * 
 * 输出描述：
 *      输出一个整数，表示岛屿的数量。如果不存在岛屿，则输出 0。
 * 
 * 输入示例：
 *      4 5
 *      1 1 0 0 0
 *      1 1 0 0 0
 *      0 0 1 0 0
 *      0 0 0 1 1
 * 
 * 输出示例：
 *      3
 * 
 * 提示信息: 
 *      https://file1.kamacoder.com/i/algo/20240516111613.png
 * 
 * 数据范围：
 *      1 <= N, M <= 50
 */

const r1 = require('readline').createInterface({ input: process.stdin });
// 创建readline接口
let iter = r1[Symbol.asyncIterator]();
// 创建异步迭代器
const readline = async () => (await iter.next()).value;

// 是地图，也就是一个二维数组
let graph
// N行， M列
let N, M
// visited标记访问过的节点，不要重复访问, 也是一个二维数组
let visited
// 结果
let result = 0
// 四个方向
const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]]

// 读取输入，初始化地图
const initGraph = async () => {
    let line = await readline();

    [N, M] = line.split(' ').map(Number)
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
 * @description: 从节点x,y开始深度优先遍历
 * @param {*} graph 是地图，也就是一个二维数组
 * @param {*} visited 标记访问过的节点，不要重复访问
 * @param {*} x 表示开始搜索节点的下标
 * @param {*} y 表示开始搜索节点的下标
 * @return {*}
 */
const dfs = (graph, visited, x, y) => {
    // 开始当前节点的四个方向左右上下去遍历
    for (let i = 0; i < 4; i++) {
        // 当前节点坐标
        const nextx = x + dir[i][0]
        const nexty = y + dir[i][1]

        // 坐标越界了，直接跳过
        if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) continue

        // 如果节点没被访问过 同时是陆地的
        if (!visited[nextx][nexty] && graph[nextx][nexty] === 1) {
            visited[nextx][nexty] = true
            dfs(graph, visited, nextx, nexty)
        }
    }
}

(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 统计岛屿数
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (!visited[i][j] && graph[i][j] === 1) {
                // 标记已访问
                visited[i][j] = true

                // 遇到没访问过的陆地，+1
                result++

                // 深度优先遍历，将相邻陆地标记为已访问
                dfs(graph, visited, i, j)
            }
        }
    }

    console.log(result)
})()