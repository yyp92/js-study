/**
 * * 岛屿的周长
 * https://kamacoder.com/problempage.php?pid=1178
 * 
 * 题目描述:
 *      给定一个由 1（陆地）和 0（水）组成的矩阵，岛屿是被水包围，并且通过水平方向或垂直方向上相邻的陆地连接而成的。
 *      你可以假设矩阵外均被水包围。在矩阵中恰好拥有一个岛屿，假设组成岛屿的陆地边长都为 1，请计算岛屿的周长。岛屿内部没有水域。
 * 
 * 输入描述:
 *      第一行包含两个整数 N, M，表示矩阵的行数和列数。之后 N 行，每行包含 M 个数字，数字为 1 或者 0，表示岛屿的单元格。
 * 
 * 输出描述:
 *      输出一个整数，表示岛屿的周长。
 * 
 * 输入示例:
 *      5 5
 *      0 0 0 0 0
 *      0 1 0 1 0
 *      0 1 1 1 0
 *      0 1 1 1 0
 *      0 0 0 0 0
 * 
 * 输出示例:
 *      14
 * 
 * 提示信息:
 *      https://file1.kamacoder.com/i/algo/20240524115244.png
 *      岛屿的周长为 14。
 * 
 * 数据范围：
 *      1 <= M, N <= 50。
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
 * * 解法一
 *      遍历每一个空格，遇到岛屿则计算其上下左右的空格情况。
 *      如果该陆地上下左右的空格是有水域，则说明是一条边：https://file1.kamacoder.com/i/algo/20240524115933.png
 *      陆地的右边空格是水域，则说明找到一条边。
 *      如果该陆地上下左右的空格出界了，则说明是一条边，如图：https://file1.kamacoder.com/i/algo/20240524120105.png
 *      该陆地的下边空格出界了，则说明找到一条边。
 */
(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 统计岛屿数
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (graph[i][j] === 1) {
                // 上下左右四个方向
                for (let k = 0; k < 4; k++) {
                    // 计算周边坐标x,y
                    let nextx = i + dir[k][0]
                    let nexty = j + dir[k][1]

                    // x在边界上
                    // x在边界上
                    // y在边界上
                    // y在边界上
                    // x,y位置是水域
                    if (nextx < 0 || nextx >= N || nexty < 0 || nexty >= M || graph[nextx][nexty] === 0) {
                        result++
                    }
                }
            }
        }
    }

    console.log(result);
})()




/**
 * * 解法二
 *  计算出总的岛屿数量，总的变数为：岛屿数量 * 4
 *  因为有一对相邻两个陆地，边的总数就要减2，如图红线部分，有两个陆地相邻，总边数就要减2
 *  https://file1.kamacoder.com/i/algo/20240524120855.png
 *  那么只需要在计算出相邻岛屿的数量就可以了，相邻岛屿数量为cover。
 *  结果 result = 岛屿数量 * 4 - cover * 2;
 */
(async function () {
    // 读取输入，初始化地图
    await initGraph()

    // 陆地数量
    let sum = 0
    // 相邻数量    
    let cover = 0

    // 统计岛屿数
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            if (graph[i][j] === 1) {
                // 统计总的陆地数量
                sum++

                // 统计上边相邻陆地
                if (i - 1 >= 0 && graph[i - 1][j] == 1) {
                    cover++
                }

                // 统计左边相邻陆地
                if (j - 1 >= 0 && graph[i][j - 1] == 1) {
                    cover++
                }

                // ! 为什么没统计下边和右边？ 因为避免重复计算
            }
        }
    }

    console.log(sum * 4 - cover * 2)
})()
