import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import Swiper from "swiper";
import { setupHeaderAnimations } from "../../utils/header";

const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
// register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

setupHeaderAnimations();

document.addEventListener("DOMContentLoaded", function () {
  let mm = gsap.matchMedia();
  // FEATURES =================================
  const techCards = document.querySelectorAll("[data-tech-card]");

  techCards.forEach((card) => {
    gsap.from(card, {
      rotationX: -18,
      duration: 0.8,
      y: "20%",
      ease: "power1.out",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
      },
    });
  });

  mm.add("(min-width: 767px)", () => {
    const pointCard01 = document.querySelector('[data-point-card="01"]');
    const pointCard02 = document.querySelector('[data-point-card="02"]');

    const pointTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech-point_slider",
        start: "center center",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      },
    });
    pointTl.to(pointCard02, {
      visibility: "visible",
    });
    pointTl.to(pointCard01, {
      opacity: 0,
      duration: 0.5,
      ease: "none",
    });
    pointTl.to(
      pointCard02,
      {
        opacity: 1,
        duration: 0.5,
        ease: "none",
      },
      "<"
    );
    pointTl.to(pointCard01, {
      visibility: "hidden",
    });
    ScrollTrigger.update();
  });

  mm.add("(max-width: 766px)", () => {
    const pointSwiper = new Swiper(".tech-point_slider", {
      slidesPerView: 1,
      spaceBetween: 16,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false,
      },
      loop: true,
    });
  });

  //metrics ===========================================

  const metricsNums = document.querySelectorAll(".metrics_card .counter-span");

  metricsNums.forEach((numText) => {
    const num = parseInt(numText.textContent, 10);

    gsap.fromTo(
      numText,
      { innerText: 0 },
      {
        innerText: num,
        duration: 2,
        ease: "none",
        scrollTrigger: {
          trigger: ".section_metrics",
          start: "top center",
          end: "bottom bottom",
        },
        onUpdate: function () {
          numText.innerText = Math.floor(numText.innerText);
        },
      }
    );
  });

    // // WHY TABS =================================
    // const whyCards = document.querySelectorAll('.why_nav-card');
    // const whyCardsImages = document.querySelectorAll('.why_content-image');
    // const whyCardsDots = document.querySelectorAll('.why_nav-dot');
    // const paginationText = document.querySelector('.wny_pagimation-active');
    // const whyContainer = document.querySelector('.for-section_why');

    // let currentTabIndex = 0;

    // function activateTab(card) {
    //     const cardTab = card.getAttribute('data-tab');

    //     whyCards.forEach(c => c.classList.remove('is--active'));
    //     whyCardsImages.forEach(img => img.classList.remove('is--active'));
    //     whyCardsDots.forEach(dot => dot.classList.remove('is--active'));

    //     card.classList.add('is--active');
    //     const matchingImage = document.querySelector(
    //         `[data-tab-image="${cardTab}"]`
    //     );
    //     const matchingDot = document.querySelector(`[data-dot="${cardTab}"]`);

    //     if (matchingImage) {
    //         matchingImage.classList.add('is--active');
    //     }

    //     if (matchingDot) {
    //         matchingDot.classList.add('is--active');
    //     }
    // }

    // function activateTabByIndex(index) {
    //     if (index < 0 || index >= whyCards.length) return;

    //     currentTabIndex = index;
    //     activateTab(whyCards[currentTabIndex]);
    //     updatePaginationText();
    // }

    // function updatePaginationText() {
    //     if (paginationText) {
    //         paginationText.textContent = `${String(currentTabIndex + 1).padStart(
    //             2,
    //             '0'
    //         )}`;
    //     }
    // }

    // // ScrollTrigger для управления табами
    // if (whyContainer && whyCards.length > 0) {
    //     const isMobile = window.innerWidth < 478;

    //     ScrollTrigger.create({
    //         trigger: whyContainer,
    //         start: isMobile ? 'top top' : '10% center',
    //         end: isMobile ? '85% center' : '85% center',
    //         scrub: true,
    //         onUpdate: self => {
    //             const progress = self.progress;
    //             let index;
    //             if (isMobile) {
    //                 if (progress < 1 / 3) {
    //                     index = 0;
    //                 } else if (progress < 2 / 3) {
    //                     index = 1;
    //                 } else {
    //                     index = 2;
    //                 }
    //             } else {
    //                 index = Math.floor(progress * whyCards.length);
    //             }
    //             activateTabByIndex(index);
    //         }
    //     });
    // }

    const whyCards = document.querySelectorAll('.why_nav-card');
    const whyCardsImages = document.querySelectorAll('.why_content-image');
    const whyCardsDots = document.querySelectorAll('.why_nav-dot');
    const paginationText = document.querySelector('[data-active-pagination]');
    const whyContainer = document.querySelector('.for-section_why');
    const prevButton = document.querySelector('[data-nav="prev"]');
    const nextButton = document.querySelector('[data-nav="next"]');
    
    let currentTabIndex = 0;
    const isMobile = window.innerWidth < 478;
    
    function activateTab(card) {
        const cardTab = card.getAttribute('data-tab');
    
        whyCards.forEach(c => c.classList.remove('is--active'));
        whyCardsImages.forEach(img => img.classList.remove('is--active'));
        whyCardsDots.forEach(dot => dot.classList.remove('is--active'));
    
        card.classList.add('is--active');
        
        const matchingImage = document.querySelector(`[data-tab-image="${cardTab}"]`);
        const matchingDot = document.querySelector(`[data-dot="${cardTab}"]`);
    
        if (matchingImage) matchingImage.classList.add('is--active');
        if (matchingDot) matchingDot.classList.add('is--active');
    
        updatePaginationText();
        updateNavButtons();
    }
    
    function activateTabByIndex(index) {
        if (index < 0 || index >= whyCards.length) return;
        currentTabIndex = index;
        activateTab(whyCards[currentTabIndex]);
    }
    
    function updatePaginationText() {
        if (paginationText) {
            paginationText.textContent = String(currentTabIndex + 1).padStart(2, '0');
        }
    }
    
    function updateNavButtons() {
        if (prevButton) {
            prevButton.style.opacity = currentTabIndex === 0 ? '0.5' : '1';
        }
        if (nextButton) {
            nextButton.style.opacity = currentTabIndex === whyCards.length - 1 ? '0.2' : '1';
        }
    }
    
    // Устанавливаем начальное состояние кнопки "Назад"
    updateNavButtons();
    
    if (isMobile) {
        // Обработчики тапов по карточкам
        whyCards.forEach((card, index) => {
            card.addEventListener('touchend', () => activateTabByIndex(index));
        });
    
        // Обработчики тапов по кнопкам навигации
        if (prevButton) {
            prevButton.addEventListener('touchend', () => activateTabByIndex(currentTabIndex - 1));
        }
        if (nextButton) {
            nextButton.addEventListener('touchend', () => activateTabByIndex(currentTabIndex + 1));
        }
    } else {
        // ScrollTrigger для управления табами на ПК
        if (whyContainer && whyCards.length > 0) {
            ScrollTrigger.create({
                trigger: whyContainer,
                start: '10% center',
                end: '85% center',
                scrub: true,
                onUpdate: self => {
                    const progress = self.progress;
                    let index = Math.floor(progress * whyCards.length);
                    activateTabByIndex(index);
                }
            });
        }
    }
    
    









  // PEM TABS =========================== / width scroll
	const pemTrack = document.querySelector('.pem_track');
	const pemTabs = document.querySelectorAll('[data-pem-tab]');
	const pemCards = document.querySelectorAll('[data-pem-card]');

	// ScrollTrigger
	gsap.registerPlugin(ScrollTrigger);

	ScrollTrigger.create({
	trigger: pemTrack,
	start: '20% center',
	end: '50% center',
	onEnter: () => switchActive('01'),
	onEnterBack: () => switchActive('01')
	});

	ScrollTrigger.create({
	trigger: pemTrack,
	start: '51% center',
	end: '80% center',
	onEnter: () => switchActive('02'),
	onEnterBack: () => switchActive('02')
	});

	function switchActive(activeValue) {
	pemTabs.forEach(tab => {
		tab.classList.toggle('is--active', tab.getAttribute('data-pem-tab') === activeValue);
	});
	pemCards.forEach(card => {
		card.classList.toggle('is--active', card.getAttribute('data-pem-card') === activeValue);
	});
	}

  // TRANSPORT
  const transportTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".transport_content",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
    },
  });
  transportTl.to('[data-transport-card="01"]', {
    scale: 0.95,
    opacity: 0.2,
  });
});
