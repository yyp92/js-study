/**
 * 螺旋矩阵II
 * https://leetcode.cn/problems/spiral-matrix-ii/
 * 
 * 给定一个正整数 n，生成一个包含 1 到 $n^2$ 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。
 * 示例:
 *  输入: 3 输出: [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]
 * 
 * 复杂度：
 *  时间复杂度 O(n^2): 模拟遍历二维矩阵的时间
 *  空间复杂度 O(1)
 */

const generateMatrix = function(n) {
    // 起始位置
    let startX = startY = 0;
    // 旋转圈数   
    let loop = Math.floor(n / 2);
    // 中间位置   
    let mid = Math.floor(n / 2);  
    // 控制每一层填充元素个数  
    let offset = 1;
    // 更新填充数字    
    let count = 1;     
    let res = new Array(n).fill(0).map(() => new Array(n).fill(0));

    while (loop--) {
        let row = startX, col = startY;

        // 上行从左到右（左闭右开）
        for (; col < n - offset; col++) {
            res[row][col] = count++;
        }

        // 右列从上到下（左闭右开）
        for (; row < n - offset; row++) {
            res[row][col] = count++;
        }

        // 下行从右到左（左闭右开）
        for (; col > startY; col--) {
            res[row][col] = count++;
        }
        
        // 左列做下到上（左闭右开）
        for (; row > startX; row--) {
            res[row][col] = count++;
        }

        // 更新起始位置
        startX++;
        startY++;

        // 更新offset
        offset++;
    }

    // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
    if (n % 2 === 1) {
        res[mid][mid] = count;
    }

    return res;
};

// 测试
console.log(generateMatrix(1));
console.log(generateMatrix(2));
console.log(generateMatrix(3));
console.log(generateMatrix(4));
console.log(generateMatrix(5));
console.log(generateMatrix(6));
  
