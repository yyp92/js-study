/**
 * 135. 分发糖果
 * 
 * 这在leetcode上是一道困难的题目，其难点就在于贪心的策略，如果在考虑局部的时候想两边兼顾，就会顾此失彼。
 * 那么本题我采用了两次贪心的策略：
 *  一次是从左到右遍历，只比较右边孩子评分比左边大的情况。
 *  一次是从右到左遍历，只比较左边孩子评分比右边大的情况。
 * 
 * 老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。
 * 你需要按照以下要求，帮助老师给这些孩子分发糖果：
 *  每个孩子至少分配到 1 个糖果。
 *  相邻的孩子中，评分高的孩子必须获得更多的糖果。
 *  那么这样下来，老师至少需要准备多少颗糖果呢？
 * 
 * 示例 1:
 *  输入: [1,0,2]
 *  输出: 5
 *  解释: 你可以分别给这三个孩子分发 2、1、2 颗糖果。
 * 
 * 示例 2:
 *  输入: [1,2,2]
 *  输出: 4
 *  解释: 你可以分别给这三个孩子分发 1、2、1 颗糖果。第三个孩子只得到 1 颗糖果，这已满足上述两个条件。
 */

const candy = function(ratings) {
    // 初始化(每个人至少一个糖果)
    let candys = new Array(ratings.length).fill(1)

    // 1.先从左到右，当右边的大于左边的就加1
    for (let i = 1; i < ratings.length; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candys[i] = candys[i - 1] + 1
        }
    }

    // 2.再从右到左，当左边的大于右边的就右边加1，但要花费糖果最少，所以需要做下判断
    for (let i = ratings.length - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candys[i] = Math.max(candys[i], candys[i + 1] + 1)
        }
    }

    // 计算总共糖果
    let count = candys.reduce((a, b) => {
        return a + b
    })

    return count
};


// 测试
const arr1 = [1, 0, 2]
const arr2 = [1, 2, 2]
console.log(candy(arr1))
console.log(candy(arr2))
