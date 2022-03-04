/**
 * throttle -> 节流
 * https://github.com/mqyqingfeng/Blog/issues/26
 * 
 * 如果你持续触发事件，每隔一段时间，只执行一次事件。
 * 
 * options: 
 *  leading：false 表示禁用第一次执行
 *  trailing: false 表示禁用停止触发的回调
 */

function throttle(func, wait, options) {
    var timeout, context, args, result;
    var previous = 0;

    if (!options) {
        options = {};
    }

    var later = function() {
        previous = options.leading === false ? 0 : new Date().getTime();
        timeout = null;
        func.apply(context, args);

        if (!timeout) {
            context = null;
            args = null;
        }
    };

    var throttled = function() {
        var now = new Date().getTime();
        if (!previous && options.leading === false) previous = now;

        // 下次触发 func 剩余的时间
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;

        // 如果没有剩余的时间了或者你改了系统时间
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(context, args);

            if (!timeout) {
                context = null;
                args = null;
            }
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
    };

    // 取消
    throttled.cancel = function() {
        clearTimeout(timeout);
        previous = 0;
        timeout = null;
    }
    
    return throttled;
}
