/**
 * 数组去重
 * https://github.com/mqyqingfeng/Blog/issues/27
 */

// 双层循环
// function unique(arr) {
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = i + 1; j < arr.length; j++) {
//             // 数值和数据类型都相等
//             if (arr[i] === arr[j]) {
//                 // arr.splice(i, 1);  // 改成arr.splice(j,1);  j--;  的话，可以一次就把同一的重复的都去掉
//                 // i--;

//                 arr.splice(j, 1); 
//                 j--;
//             }
//         }
//     }

//     return arr;
// }


// indexOf
// function unique(array) {
//     var res = [];

//     for (var i = 0, len = array.length; i < len; i++) {
//         var current = array[i];
//         if (res.indexOf(current) === -1) {
//             res.push(current)
//         }
//     }

//     return res;
// }


// 排序后去重
function unique(array) {
    var res = [];
    var sortedArray = array.concat().sort();
    var seen;

    for (var i = 0, len = sortedArray.length; i < len; i++) {
        // 如果是第一个元素或者相邻的元素不相同
        if (!i || seen !== sortedArray[i]) {
            res.push(sortedArray[i])
        }

        seen = sortedArray[i];
    }
    
    return res;
}


// 测试
var array = [1, 1, '1', '1'];
console.log(unique(array)); // [1, "1"]