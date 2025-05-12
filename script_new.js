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
});
