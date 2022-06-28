/**
 * 三数之和
 * 
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 * 注意： 答案中不可以包含重复的三元组。
 * 示例：
 *  给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 *  满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
 * 
 * 思路：
 *  拿这个nums数组来举例，首先将数组排序，然后有一层for循环，i从下标0的地方开始，同时定一个下标left 定义在i+1的位置上，定义下标right 在数组结尾的位置上。
 *  依然还是在数组中找到 abc 使得a + b +c =0，我们这里相当于 a = nums[i] b = nums[left] c = nums[right]。
 *  接下来如何移动left 和right呢， 如果nums[i] + nums[left] + nums[right] > 0 就说明 此时三数之和大了，因为数组是排序后了，所以right下标就应该向左移动，这样才能让三数之和小一些。
 *  如果 nums[i] + nums[left] + nums[right] < 0 说明 此时 三数之和小了，left 就向右移动，才能让三数之和大一些，直到left与right相遇为止。
 *  时间复杂度：$O(n^2)$。
 */

// 循环内不考虑去重 
// var threeSum = function(nums) {
//     const len = nums.length;
//     if(len < 3) return [];

//     nums.sort((a, b) => a - b);
//     const resSet = new Set();

//     for(let i = 0; i < len - 2; i++) {
//         if(nums[i] > 0) break;

//         let l = i + 1, r = len - 1;

//         while(l < r) {
//             const sum = nums[i] + nums[l] + nums[r];
//             if(sum < 0) { l++; continue };
//             if(sum > 0) { r--; continue };

//             resSet.add(`${nums[i]},${nums[l]},${nums[r]}`);
//             l++;
//             r--;
//         }
//     }
//     return Array.from(resSet).map(i => i.split(","));
// };

// 去重优化
// var threeSum = function(nums) {
//     const len = nums.length;
//     if(len < 3) return [];
//     nums.sort((a, b) => a - b);
//     const res = [];
//     for(let i = 0; i < len - 2; i++) {
//         if(nums[i] > 0) break;
//         // a去重
//         if(i > 0 && nums[i] === nums[i - 1]) continue;
//         let l = i + 1, r = len - 1;
//         while(l < r) {
//             const sum = nums[i] + nums[l] + nums[r];
//             if(sum < 0) { l++; continue };
//             if(sum > 0) { r--; continue };
//             res.push([nums[i], nums[l], nums[r]])
//             // b c 去重 
//             while(l < r && nums[l] === nums[++l]);
//             while(l < r && nums[r] === nums[--r]);
//         }
//     }
//     return res;
// };

var threeSum = function(nums) {
    const res = []
    const len = nums.length

    // 将数组排序
    nums.sort((a, b) => a - b)

    for (let i = 0; i < len; i++) {
        let l = i + 1
        let r = len - 1
        let iNum = nums[i]

        // 数组排过序，如果第一个数大于0直接返回res
        if (iNum > 0) return res

        // 去重
        if (iNum == nums[i - 1]) continue

        while(l < r) {
            let lNum = nums[l], rNum = nums[r], threeSum = iNum + lNum + rNum
            // 三数之和小于0，则左指针向右移动
            if (threeSum < 0) {
                l++
            }
            else if (threeSum > 0) {
                r--
            }
            else {
                res.push([iNum, lNum, rNum])
                
                // 去重
                while(l < r && nums[l] == nums[l + 1]){
                    l++
                }
                while(l < r && nums[r] == nums[r - 1]) {
                    r--
                }
                l++
                r--
            }
        }
    }
    return res
};


// 测试
const nums = [-1, 0, 1, 2, -1, -4]
console.log(threeSum(nums)) //  [ [-1, 0, 1], [-1, -1, 2] ]
