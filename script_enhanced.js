// script_enhanced.js - 美化版

document.addEventListener('DOMContentLoaded', () => {
    // 更新页脚年份
    updateFooterYear();

    // 设置导航菜单交互
    setupNavigation();

    // 创建文章卡片动画
    setupPostItemAnimations();

    // 添加滚动导航栏效果
    setupScrollEffects();

    // 设置Hero区域的粒子效果
    if (document.querySelector('.hero-section')) {
        createHeroParticles();
    }

    // 设置图片点击放大效果（适用于博客文章内的图片）
    if (document.querySelector('.single-post-content')) {
        setupLightbox();
    }

    // 为代码块添加语法高亮效果
    highlightCodeBlocks();
});

// 更新页脚年份
function updateFooterYear() {
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

// 设置导航菜单交互
function setupNavigation() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-navigation');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileNavToggle.classList.toggle('active');
            const isExpanded = mainNav.classList.contains('active');
            mobileNavToggle.setAttribute('aria-expanded', isExpanded);
        });

        // 点击导航链接后关闭移动导航菜单
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    mobileNavToggle.classList.remove('active');
                    mobileNavToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // 点击导航外部关闭移动导航菜单
        document.addEventListener('click', (event) => {
            if (window.innerWidth <= 768 && 
                !mainNav.contains(event.target) && 
                !mobileNavToggle.contains(event.target) &&
                mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// 设置文章卡片动画
function setupPostItemAnimations() {
    const postItems = document.querySelectorAll('.post-item');
    if (postItems.length > 0) {
        const observerOptions = {
            root: null, // 相对于浏览器视口
            rootMargin: '0px',
            threshold: 0.15 // 元素可见15%时触发
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // 延迟添加可见类，创建级联效果
                    setTimeout(() => {
                        entry.target.classList.add('is-visible');
                    }, entry.target.dataset.delay || 0);
                    observer.unobserve(entry.target); // 触发后停止观察
                }
            });
        };

        const intersectionObserver = new IntersectionObserver(observerCallback, observerOptions);
        
        // 为每个卡片添加延迟，创建级联动画效果
        postItems.forEach((item, index) => {
            item.dataset.delay = index * 100; // 每个卡片延迟100ms
            intersectionObserver.observe(item);
        });
    }
}

// 设置滚动效果
function setupScrollEffects() {
    const header = document.querySelector('.site-header');
    const scrollTopBtn = document.createElement('button');
    
    // 添加"返回顶部"按钮
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', '返回顶部');
    scrollTopBtn.setAttribute('title', '返回顶部');
    document.body.appendChild(scrollTopBtn);
    
    // 监听滚动事件
    window.addEventListener('scroll', () => {
        // 滚动时改变导航样式
        if (header && window.scrollY > 50) {
            header.classList.add('scrolled');
        } else if (header) {
            header.classList.remove('scrolled');
        }
        
        // 显示/隐藏"返回顶部"按钮
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    // 设置"返回顶部"按钮点击事件
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 添加"返回顶部"按钮样式
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            border: none;
            font-size: 24px;
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.3s, transform 0.3s;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
            z-index: 99;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .scroll-top-btn:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
            transform: translateY(-3px);
        }
        .scroll-top-btn.visible {
            opacity: 1;
            transform: translateY(0);
        }
        @media (max-width: 768px) {
            .scroll-top-btn {
                width: 40px;
                height: 40px;
                font-size: 20px;
                bottom: 20px;
                right: 20px;
            }
        }
    `;
    document.head.appendChild(style);
}

// 创建Hero区域粒子效果
function createHeroParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    // 添加粒子容器
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hero-particles';
    heroSection.appendChild(particlesContainer);
    
    // 创建粒子
    const particleCount = Math.floor(window.innerWidth / 10); // 响应式粒子数量
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
}

// 创建单个粒子
function createParticle(container) {
    const particle = document.createElement('span');
    particle.className = 'hero-particle';
    
    // 随机初始位置
    const posX = Math.random() * window.innerWidth;
    const posY = Math.random() * container.offsetHeight;
    
    // 随机尺寸
    const size = Math.random() * 5 + 3;
    
    // 随机透明度
    const opacity = Math.random() * 0.5 + 0.3;
    
    // 随机动画时长和延迟
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    // 设置样式
    particle.style.left = `${posX}px`;
    particle.style.top = `${posY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    container.appendChild(particle);
}

// 设置图片灯箱效果
function setupLightbox() {
    const content = document.querySelector('.single-post-content');
    if (!content) return;
    
    const images = content.querySelectorAll('img');
    if (images.length === 0) return;
    
    // 创建灯箱元素
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="" alt="" class="lightbox-image">
            <button class="lightbox-close" aria-label="关闭">&times;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const lightboxImg = lightbox.querySelector('.lightbox-image');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    
    // 为每个图片添加点击事件
    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    });
    
    // 关闭灯箱
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // 添加键盘支持 (ESC键关闭)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    // 添加灯箱样式
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s, visibility 0.3s;
        }
        
        .lightbox.active {
            opacity: 1;
            visibility: visible;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-image {
            max-width: 100%;
            max-height: 90vh;
            border-radius: 8px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.25);
            transform: scale(0.95);
            transition: transform 0.3s;
        }
        
        .lightbox.active .lightbox-image {
            transform: scale(1);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            width: 30px;
            height: 30px;
            background: none;
            border: none;
            color: white;
            font-size: 30px;
            cursor: pointer;
            opacity: 0.7;
            transition: opacity 0.2s;
        }
        
        .lightbox-close:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);
}

// 为代码块添加语法高亮效果
function highlightCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');
    if (codeBlocks.length === 0) return;
    
    // 简单的语法高亮（实际项目中可以集成专业的库如Prism.js或Highlight.js）
    codeBlocks.forEach(block => {
        // 添加行号
        const lines = block.innerHTML.split('\n');
        if (lines[lines.length - 1] === '') lines.pop();
        
        let numberedCode = '';
        lines.forEach((line, index) => {
            numberedCode += `<div class="code-line"><span class="line-number">${index + 1}</span>${line}</div>`;
        });
        
        block.innerHTML = numberedCode;
        block.parentElement.classList.add('enhanced-code-block');
    });
    
    // 添加代码块样式
    const style = document.createElement('style');
    style.textContent = `
        .enhanced-code-block {
            position: relative;
            border-radius: var(--card-radius);
            margin: 2em 0;
        }
        
        .code-line {
            display: flex;
            white-space: pre;
        }
        
        .line-number {
            opacity: 0.5;
            padding-right: 1em;
            text-align: right;
            min-width: 2.5em;
            user-select: none;
        }
    `;
    document.head.appendChild(style);
}
