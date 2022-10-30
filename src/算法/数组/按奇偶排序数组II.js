/**
 * 922. 按奇偶排序数组II
 * https://leetcode.cn/problems/sort-array-by-parity-ii/
 * 
 * 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。
 * 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。
 * 你可以返回任何满足上述条件的数组作为答案。
 * 
 * 示例：
 *  输入：[4,2,5,7]
 *  输出：[4,5,2,7]
 *  解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。
 */
// 方法一
var sortArrayByParityII = function(nums) {
    const n = nums.length;
    // 分别存放 nums 中的奇数、偶数
    let evenIndex = 0, oddIndex = 0;
    // 初始化就确定数组大小，节省开销
    const even = new Array(Math.floor(n / 2));
    const odd = new Array(Math.floor(n / 2));

    // 把A数组放进偶数数组，和奇数数组
    for (let i = 0; i < n; i++) {
        if (nums[i] % 2 === 0) {
            even[evenIndex++] = nums[i]
        }
        else {
            odd[oddIndex++] = nums[i]
        }
    }

    // 把奇偶数组重新存回 nums
    let index = 0;
    for (let i = 0; i < even.length; i++) {
        nums[index++] = even[i];
        nums[index++] = odd[i];
    }

    return nums;
};

// 方法二
var sortArrayByParityII1 = function(nums) {
    const n = nums.length;
    const result = new Array(n);

    // 偶数下标 和 奇数下标
    let evenIndex = 0, oddIndex = 1;

    for (let i = 0; i < n; i++){
        if (nums[i] % 2 === 0) {
            result[evenIndex] = nums[i];
            evenIndex += 2;
        } 
        else {
            result[oddIndex] = nums[i];
            oddIndex += 2;
        }
    }

    return result;
};

// 方法三
var sortArrayByParityII2 = function(nums) {
    let oddIndex = 1;
    for (let i = 0; i < nums.length; i += 2){
        // 在偶数位遇到了奇数
        if (nums[i] % 2 === 1){ 
            // 在奇数位找一个偶数
            while(nums[oddIndex] % 2 !== 0) {
                oddIndex += 2;
            }

            // 解构赋值交换
            [nums[oddIndex], nums[i]] = [nums[i], nums[oddIndex]]; 
        }
    }

    return nums;
};


// 测试
const arr = [4,2,5,7]
console.log(sortArrayByParityII(arr))
console.log(sortArrayByParityII1(arr))
console.log(sortArrayByParityII2(arr))