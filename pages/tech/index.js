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

  // // PEM TABS =========================== / width click
  // const pemTabBtns = document.querySelectorAll('.pem_left-card')
  // const pemTabCards = document.querySelectorAll('.pem_content-slide')

  // // Устанавливаем первый таб как активный по умолчанию
  // pemTabBtns[0].classList.add('is--active')
  // pemTabCards[0].style.opacity = 1

  // pemTabBtns.forEach((tab, index) => {
  // 	tab.addEventListener('click', () => {
  // 		// Добавляем класс активности на выбранный таб
  // 		pemTabBtns.forEach(btn => btn.classList.remove('is--active'))
  // 		tab.classList.add('is--active')

  // 		// Переключаем карточки
  // 		pemTabCards.forEach(card => {
  // 			const cardValue = card.getAttribute('data-pem-card')
  // 			const tabValue = tab.getAttribute('data-pem-tab')

  // 			if (cardValue === tabValue) {
  // 				gsap.to(card, {
  // 					opacity: 1,
  // 					duration: 0.5,
  // 					position: 'relative',
  // 					zIndex: 1,
  // 					onComplete: function () {
  // 						ScrollTrigger.update()
  // 					},
  // 				})
  // 			} else {
  // 				gsap.to(card, {
  // 					opacity: 0,
  // 					duration: 0.5,
  // 					position: 'absolute',
  // 					zIndex: -1,
  // 					onComplete: function () {
  // 						ScrollTrigger.update()
  // 					},
  // 				})
  // 			}
  // 		})
  // 	})
  // })

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
