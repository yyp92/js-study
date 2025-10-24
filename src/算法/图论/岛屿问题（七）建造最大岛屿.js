/**
 * * 建造最大岛屿
 * https://kamacoder.com/problempage.php?pid=1176
 * 
 * 题目描述：
 *      给定一个由 1（陆地）和 0（水）组成的矩阵，你最多可以将矩阵中的一格水变为一块陆地，在执行了此操作之后，矩阵中最大的岛屿面积是多少。
 *      岛屿面积的计算方式为组成岛屿的陆地的总数。岛屿是被水包围，并且通过水平方向或垂直方向上相邻的陆地连接而成的。你可以假设矩阵外均被水包围。
 * 
 * 输入描述：
 *      第一行包含两个整数 N, M，表示矩阵的行数和列数。之后 N 行，每行包含 M 个数字，数字为 1 或者 0，表示岛屿的单元格。
 * 
 * 输出描述：
 *      输出一个整数，表示最大的岛屿面积。
 * 
 * 输入示例：
 *      4 5
 *      1 1 0 0 0
 *      1 1 0 0 0
 *      0 0 1 0 0
 *      0 0 0 1 1
 * 
 * 输出示例：
 *      6
 * 
 * 提示信息：
 *      https://file1.kamacoder.com/i/algo/20240522154055.png
 *      对于上面的案例，有两个位置可将 0 变成 1，使得岛屿的面积最大，即 6。
 *      https://file1.kamacoder.com/i/algo/20240522154110.png
 * 
 * 数据范围：
 *      1 <= M, N <= 50。
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
// 访问过的节点, 标记岛屿 
let visited 
// 方向
const dir = [[0, 1], [1, 0], [0, -1], [-1, 0]] 
// 统计岛屿面积
let count = 0 
// 存储岛屿面积
let areaMap = new Map() 


// 读取输入，初始化地图
const initGraph = async () => {
    let line = await readline();
    [N, M] = line.split(' ').map(Number);
    graph = new Array(N).fill(0).map(() => new Array(M).fill(0))
    visited = new Array(N).fill(0).map(() => new Array(M).fill(0))

    for (let i = 0; i < N; i++) {
        line = await readline()
        line = line.split(' ').map(Number)

        for (let j = 0; j < M; j++) {
            graph[i][j] = line[j]
        }
    }
}

/**
 * @description: 从（x，y）开始深度优先遍历地图
 * @param {*} graph 地图
 * @param {*} visited 可访问节点
 * @param {*} x 开始搜索节点的下标
 * @param {*} y 开始搜索节点的下标
 * @param {*} mark 当前岛屿的标记
 * @return {*}
 */
const dfs = (graph, visited, x, y, mark) => {
    // 终止条件：访问过的节点
    if (visited[x][y] != 0) {
        return
    }
    // 标记访问过
    visited[x][y] = mark
    count++

    for (let i = 0; i < 4; i++) {
        let nextx = x + dir[i][0]
        let nexty = y + dir[i][1]

        // 越界, 跳过
        if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) {
            continue
        } 

        // 已访问过, 或者是海洋, 跳过
        if (visited[nextx][nexty] != 0 || graph[nextx][nexty] == 0) {
            continue
        }

        dfs(graph, visited, nextx, nexty, mark)
    }
}

(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 标记整个地图都是陆地
    let isAllLand = true 

    // 标记岛屿
    let mark = 2 
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (graph[i][j] == 0 && isAllLand) {
                isAllLand = false
            }

            if (graph[i][j] === 1 && visited[i][j] === 0) {
                count = 0

                // 将与其链接的陆地都标记上
                dfs(graph, visited, i, j, mark)

                // 记录每一个岛屿的面积
                areaMap.set(mark, count)

                // 记录下一个岛屿编号
                mark++
            }
        }
    }

    // 如果全是陆地, 直接返回面积
    if (isAllLand) {
        console.log(N * M)
        return
    }

    // 记录最后结果
    let result = 0
    // 标记访问过的岛屿, 因为海洋四周可能是同一个岛屿, 需要标记避免重复统计面积
    let visitedIsland = new Map() 
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (visited[i][j] === 0) {
                // 记录连接之后的岛屿数量
                count = 1  
                // 每次使用时，清空
                visitedIsland.clear()

                // 计算海洋周围岛屿面积
                for (let m = 0; m < 4; m++) {
                    const nextx = i + dir[m][0]
                    const nexty = j + dir[m][1]

                    // 越界, 跳过
                    if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M) {
                        continue
                    }

                    const island = visited[nextx][nexty]
                    // 四周是海洋或者访问过的陆地 跳过
                    if (island == 0 || visitedIsland.get(island)) {
                        continue
                    }

                    // 标记为访问, 计算面积
                    visitedIsland.set(island, true)
                    count += areaMap.get(visited[nextx][nexty])
                }

                result = Math.max(result, count)
            }
        }
    }

    console.log(result)
})()
