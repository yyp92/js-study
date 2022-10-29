/**
 * 1207.独一无二的出现次数
 * https://leetcode.cn/problems/unique-number-of-occurrences/
 * 
 * 给你一个整数数组 arr，请你帮忙统计数组中每个数的出现次数。
 * 如果每个数的出现次数都是独一无二的，就返回 true；否则返回 false。
 * 
 * 示例 1：
 *  输入：arr = [1,2,2,1,1,3]
 *  输出：true
 *  解释：在该数组中，1 出现了 3 次，2 出现了 2 次，3 只出现了 1 次。没有两个数的出现次数相同。
 * 
 * 示例 2：
 *  输入：arr = [1,2]
 *  输出：false
 * 
 * 示例 3：
 *  输入：arr = [-3,0,1,-3,1,1,1,-3,10,0]
 *  输出：true
 * 
 * 提示：
 *  1 <= arr.length <= 1000
 *  -1000 <= arr[i] <= 1000
 */

// 方法一：使用数组记录元素出现次数
const uniqueOccurrences = function(arr) {
    // -1000 <= arr[i] <= 1000
    const count = new Array(2002).fill(0);

    for (let i = 0; i < arr.length; i++){
        // 防止负数作为下标
        count[arr[i] + 1000]++;
    }

    // 标记相同频率是否重复出现
    // 1 <= arr.length <= 1000
    const fre = new Array(1002).fill(false);

    for (let i = 0; i <= 2000; i++){
        // 有i出现过
        if (count[i] > 0) {
            if (fre[count[i]] === false) {
                // 之前未出现过，标记为出现
                fre[count[i]] = true;
            } 
            else {
                // 之前就出现了，重复出现
                return false;
            } 
        }
    }

    return true;
};

// 方法二：使用Map 和 Set
const uniqueOccurrences1 = function(arr) {
    // 记录每个元素出现次数
    let map = new Map();

    arr.forEach( x => {
        map.set(x, (map.get(x) || 0) + 1); 
    })

    // Set() 里的元素是不重复的。如果有元素出现次数相同，则最后的set的长度不等于map的长度
    return map.size === new Set(map.values()).size
};

// 测试
const arr1 = [1,2,2,1,1,3]
const arr2 = [1,2]
const arr3 = [-3,0,1,-3,1,1,1,-3,10,0]
console.log(uniqueOccurrences(arr1))
console.log(uniqueOccurrences(arr2))
console.log(uniqueOccurrences(arr3))
console.log(uniqueOccurrences1(arr1))
console.log(uniqueOccurrences1(arr2))
console.log(uniqueOccurrences1(arr3))