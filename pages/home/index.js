import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import Swiper from 'swiper'
import { setupHeaderAnimations } from '../../utils/header'
// register plugins
gsap.registerPlugin(ScrollTrigger, SplitText)

document.addEventListener('DOMContentLoaded', function () {
    console.log('shoto');
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    setupHeaderAnimations();

    // MIND =================================
    const mindTitleSplit = new SplitText('[data-animate="mind-title"]', {
        type: 'words, chars',
    });
    gsap.to(mindTitleSplit.chars, {
        color: 'var(--colors-text--white)',
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.mind-features_wrapper',
            start: 'top center+=20vh',
            end: 'top+=100vh bottoms',
            scrub: 1,
        },
    });

    // FEATURES =================================
    const featuresCards = document.querySelectorAll('.features_card');

    featuresCards.forEach(card => {
        gsap.from(card, {
            rotationX: -18,
            duration: 0.8,
            y: '20%',
            ease: 'power1.out',
            scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
            },
        });
    });

    // WHY TABS =================================
    const whyCards = document.querySelectorAll('.why_nav-card');
    const whyCardsImages = document.querySelectorAll('.why_content-image');
    const whyCardsDots = document.querySelectorAll('.why_nav-dot');
    const paginationText = document.querySelector('.wny_pagimation-active');
    const whyWrapper = document.querySelector('.why_wrapper');

    let currentTabIndex = 0;

    function activateTab(card) {
        const cardTab = card.getAttribute('data-tab');

        whyCards.forEach(c => c.classList.remove('is--active'));
        whyCardsImages.forEach(img => img.classList.remove('is--active'));
        whyCardsDots.forEach(dot => dot.classList.remove('is--active'));

        card.classList.add('is--active');
        const matchingImage = document.querySelector(
            `[data-tab-image="${cardTab}"]`
        );
        const matchingDot = document.querySelector(`[data-dot="${cardTab}"]`);

        if (matchingImage) {
            matchingImage.classList.add('is--active');
        }

        if (matchingDot) {
            matchingDot.classList.add('is--active');
        }
    }

    function activateTabByIndex(index) {
        if (index < 0 || index >= whyCards.length) return;

        currentTabIndex = index;
        activateTab(whyCards[currentTabIndex]);
        updatePaginationText();
    }

    function updatePaginationText() {
        if (paginationText) {
            paginationText.textContent = `${String(currentTabIndex + 1).padStart(
                2,
                '0'
            )}`;
        }
    }

    // ScrollTrigger для управления табами
    if (whyWrapper && whyCards.length > 0) {
        const isMobile = window.innerWidth < 478;

        ScrollTrigger.create({
            trigger: whyWrapper,
            start: isMobile ? 'top top' : '10% center',
            end: isMobile ? '75% center' : '75% center',
            scrub: true,
            onUpdate: self => {
                const progress = self.progress;
                let index;
                if (isMobile) {
                    if (progress < 1 / 3) {
                        index = 0;
                    } else if (progress < 2 / 3) {
                        index = 1;
                    } else {
                        index = 2;
                    }
                } else {
                    index = Math.floor(progress * whyCards.length);
                }
                activateTabByIndex(index);
            }
        });
    }

    // DISCOVER LINES RUN =================================
    const discoverLinesTl = gsap.timeline();
    discoverLinesTl.to('[data-animate="discover-line"] .lines_line', {
        xPercent: -100,
        repeat: -1,
        duration: 25,
        ease: 'linear',
    });
    discoverLinesTl.to(
        '[data-animate="discover-line-reverse"] .lines_line',
        {
            xPercent: 100,
            repeat: -1,
            duration: 25,
            ease: 'linear',
        },
        '<'
    );

    // Discover BALL ============================
    const discoverBallTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.discover_content-camera',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
        },
    });
    discoverBallTl.to('.discover_nums-wrapper', {
        height: 'auto',
        duration: 0.8,
    });
    discoverBallTl.to(
        '.discover_content-ball',
        {
            rotation: 0,
            duration: 0.5,
        },
        '<'
    );
    discoverBallTl.to('.discover_nums-wrapper', {
        opacity: 1,
        duration: 0.5,
    });
    discoverBallTl.to(
        '[data-animate="discover-dot"]',
        {
            opacity: 1,
            duration: 0.5,
            stagger: 0.06,
        },
        '<'
    );

    // NEWS LINES
    const imagesWrapper = document.querySelectorAll('.news_line');

    // Logo SLIDER ANIMATION
    imagesWrapper.forEach(wrapper => {
        gsap.to(wrapper, {
            xPercent: -100,
            repeat: -1,
            duration: 25,
            ease: 'linear',
        });
    });

    // NEWS SLIDER ==========================================
    const newsSlider = new Swiper('.news_slider', {
        slidesPerView: 'auto',
        spaceBetween: 24,
    });
});
