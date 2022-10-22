/**
 * 941.有效的山脉数组
 * 
 * 给定一个整数数组 arr，如果它是有效的山脉数组就返回 true，否则返回 false。
 * 让我们回顾一下，如果 A 满足下述条件，那么它是一个山脉数组：
 *  arr.length >= 3
 *  在 0 < i < arr.length - 1 条件下，存在 i 使得：
 *      arr[0] < arr[1] < ... arr[i-1] < arr[i]
 *      arr[i] > arr[i+1] > ... > arr[arr.length - 1]
 * https://code-thinking-1253855093.file.myqcloud.com/pics/20210729103604.png
 * 
 * 示例 1：
 *  输入：arr = [2,1]
 *  输出：false
 * 
 * 示例 2：
 *  输入：arr = [3,5,5]
 *  输出：false
 * 
 * 示例 3：
 *  输入：arr = [0,3,2,1]
 *  输出：true
 */
const validMountainArray = function(arr) {
    // 一定不是山脉数组
    if(arr.length < 3) return false;

    // 双指针
    let left = 0, right = arr.length - 1;

    // 注意防止越界
    while(left < arr.length && arr[left] < arr[left +1 ]) left++;
    while(right > 0 && arr[right - 1] > arr[right]) right--;

    // 如果left或者right都在起始位置，说明不是山峰
    if(left === right && left !== 0 && right !== arr.length - 1) return true;

    return false;
};


// 测试
const arr1 = [2, 1]
const arr2 = [3, 5, 5]
const arr3 = [0, 3, 2, 1]
console.log(validMountainArray(arr1))
console.log(validMountainArray(arr2))
console.log(validMountainArray(arr3))