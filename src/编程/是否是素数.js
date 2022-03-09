/**
 * 是否是素数
 * https://juejin.cn/post/6901200044691554312
 * 
 * 定义：约数只有1和本身的整数称为质数，或称素数。
 */
// function primeNum(val) {
//     let n = val && parseInt(val);
//     // 声明变量，记录余数为0的次数
//     let num = 0;

//     // for循环 i初始值从1开始
//     for (let i = 1; i <= n; i++) {
//     	// 求余，并判断余数是否等于 0 ，如果等于 0 ，则 num 加 1
//         if(n % i === 0) {
//             num++ 
//         }
//     }

//     // 判断 num 是否大于2，大于 2 是合数，否则就是质数
//     if (num > 2) {
//         console.log(n + ' 是合数')
//     } else {
//         console.log(n + ' 是质数')
//     }
// }


// 优化
function primeNum(nub) {
    let n = parseInt(nub);
    // 声明变量num，初始值为true
    let isPrime = true;
    /* 
    	for循环里面的 i 变量初始值从2开始，去掉了可以整除的 1，把等号删掉，
    	可以去除它本身
    */
    for (let i = 2; i < n; i++) {
        if (n % i == 0) {
        	/*
              		走到这里，说明这个整数除了1和他本身之外，还可以被其他数整除，
              		isPrime变为false，同时终止循环
		*/ 
            isPrime = false;
            break;
        }
    }
    
    if(!isPrime) {
        console.log(n + ' 是合数')
    } else {
        console.log(n + ' 是质数')
    }
}


// 7 是质数
primeNum(7)
primeNum(6)
primeNum(2)