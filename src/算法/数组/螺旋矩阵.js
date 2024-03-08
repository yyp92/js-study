/**
 * * 螺旋矩阵
 * https://leetcode.cn/problems/spiral-matrix/description/
 * 
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 * 
 * 示例1：
 *  https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg
 *  输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 *  输出：[1,2,3,6,9,8,7,4,5]
 * 
 * 
 * 示例2：
 *  https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg
 *  输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
 *  输出：[1,2,3,4,8,12,11,10,9,5,6,7]
 * 
 * 提示：
 *  m == matrix.length
 *  n == matrix[i].length
 *  1 <= m, n <= 10
 *  -100 <= matrix[i][j] <= 100
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
const spiralOrder = function(matrix) {
    const m = matrix.length
    const n = matrix[0].length
    // 统计矩阵从外向内的层数，如果矩阵非空，那么它的层数至少为1层
    const loop = Math.floor((Math.min(m, n) + 1) / 2)
    // 圈数
    let count = 0
    const res = []

    // 从外部向内部遍历，逐层打印数据
    while(count < loop) {
        // 从左向右, (整行)
        for (let col = count; col < n - count; col++) {
            res.push(matrix[count][col])
        }

        // 从上往下, (除了第一个，一直到最后一个)
        for (let row = count + 1; row < m - count; row++) {
            res.push(matrix[row][n - 1 - count])
        }

        // 从右往左，(除了第一个，一直到最后一个)
        // * 如果这一层只有1行，那么第一个循环已经将该行打印了，这里就不需要打印了，即 （m - 1 - count ）!== count
        for (let col = (n - 1) - (count + 1); col >= count && (m - 1 - count !== count); col--) {
            res.push(matrix[m - 1 - count][col])
        }

        // 从下往上，(除了第一个和最后一个，因为最后一个从左往右已经使用过了)
        // * 如果这一层只有1列，那么第2个循环已经将该列打印了，这里不需要打印，即(n - 1 - count) !== count
        for (let row = (m - 1) - (count + 1); row >= count + 1 && (n - 1 - count) !== count; row--) {
            res.push(matrix[row][count])
        }

       count++
    }

    return res
};


/**
 * 测试
 */
// [1, 2, 3, 6, 9, 8, 7, 4, 5]
const matrix1 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]
// [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]
const matrix2 = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12]
]
// [1, 2, 3, 6, 9, 12, 11, 10, 7, 4, 5, 8]
const matrix3 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
]
// [6, 9, 7]
const matrix4 =[
    [6, 9, 7]
]
// [6, 9, 7]
const matrix5 =[
    [6],
    [9],
    [7]
]
// [2, 3, 4, 7, 10, 13, 16, 15, 14, 11, 8, 5, 6, 9, 12]
const matrix6 =[
    [2, 3, 4],
    [5, 6, 7],
    [8, 9, 10],
    [11, 12, 13],
    [14, 15, 16]
]
// [1, 2, 3, 6, 9, 12, 15, 18, 17, 16, 13, 10, 7, 4, 5, 8, 11, 14]
const matrix7 =[
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12],
    [13, 14, 15],
    [16, 17, 18]
]
console.log('matrix1', spiralOrder(matrix1))
console.log('matrix2', spiralOrder(matrix2))
console.log('matrix3', spiralOrder(matrix3))
console.log('matrix4', spiralOrder(matrix4))
console.log('matrix5', spiralOrder(matrix5))
console.log('matrix6', spiralOrder(matrix6))
console.log('matrix7', spiralOrder(matrix7))