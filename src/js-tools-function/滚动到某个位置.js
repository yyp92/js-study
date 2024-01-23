/**
 * 滚动到页面顶部
 */
const scrollToTop = () => {
    const height = document.documentElement.scrollTop || document.body.scrollTop;
    
    if (height > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, height - height / 8);
    }
}


/**
 * 滚动到元素位置
 */
const smoothScroll = element =>{
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
};

// 用法
smoothScroll('#target'); // 平滑滚动到 ID 为 target 的元素