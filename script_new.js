// script_new.js

document.addEventListener('DOMContentLoaded', () => {
    // 更新页脚年份
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 移动端导航切换
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-navigation');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
            // 可选：切换 aria-expanded 属性
            const isExpanded = mainNav.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // 未来可以添加更多交互功能，例如：
    // - 平滑滚动到锚点
    // - 文章分享功能
    // - 图片灯箱 (如果需要，可以考虑轻量级库或原生实现)
    // - 代码块高亮 (如果需要)

    // 文章卡片进入动画
    const postItems = document.querySelectorAll('.post-item');
    if (postItems.length > 0) {
        const observerOptions = {
            root: null, // 相对于浏览器视口
            rootMargin: '0px',
            threshold: 0.1 // 元素可见10%时触发
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // 触发后停止观察，动画只播放一次
                }
            });
        };

        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        postItems.forEach(item => {
            intersectionObserver.observe(item);
        });
    }
});
