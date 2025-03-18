import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import { setupHeaderAnimations } from '../../utils/header'
// register plugins
gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', function () {
	const lenis = new Lenis()
	lenis.on('scroll', ScrollTrigger.update)
	gsap.ticker.add(time => {
		lenis.raf(time * 1000)
	})
	gsap.ticker.lagSmoothing(0)
	let mm = gsap.matchMedia()

	setupHeaderAnimations()

	// Клонирование карточек (из предыдущего примера)
	const cards = document.querySelectorAll('.ind_card')
	const container = document.querySelector('.ind_content') // Родитель карточек
	const totalClones = 15

	for (let i = 0; i < totalClones; i++) {
		cards.forEach(card => {
			const clone = card.cloneNode(true)
			container.appendChild(clone)
		})
	}

	const allCards = document.querySelectorAll('.ind_card')
	allCards.forEach((card, index) => {
		card.style.transform = `translateX(-50%) rotate(${
			(340 + 10 * index) % 360
		}deg)`
	})

	gsap.to('.ind_content', {
		rotation: 360,
		repeat: -1,
		duration: 80,
		ease: 'linear',
		scrollTrigger: {
			trigger: '.section_ind',
			start: 'top bottom',
			end: 'bottom top',
			toggleActions: 'play pause resume pause',
		},
	})

	// Инициализируем первый слайдер
	const slider1 = new Swiper('.work_swiper', {
		modules: [Navigation],
		effect: 'fade',
		fadeEffect: {
			crossFade: true,
		},
		slidesPerView: 1,
		navigation: {
			nextEl: '#work-btn-next',
			prevEl: '#work-btn-prev',
		},
		on: {
			slideChange: function () {
				const currentIndex = slider1.realIndex
				const paginationItems = document.querySelectorAll('.work_pag-item')

				paginationItems.forEach(item => item.classList.remove('is--active'))

				// Добавляем класс `is--active` к соответствующему элементу
				if (paginationItems[currentIndex]) {
					paginationItems[currentIndex].classList.add('is--active')
				}
			},
		},
	})

	const slider2 = new Swiper('.work_image', {
		slidesPerView: 1,
		allowTouchMove: false,
	})

	// Связываем слайдеры
	slider1.on('slideChange', () => {
		slider2.slideTo(slider1.activeIndex)
	})
	
	// Temporal off slider1
	slider1.allowSlideNext = false
	slider1.allowSlidePrev = false
	slider1.allowTouchMove = false // Отключает свайп


	// STORIES
	mm.add('(max-width: 767px)', () => {
		const storiesCards = document.querySelectorAll('.stories_card')
		const storiesBtnMore = document.querySelector('.stories_btn-more')
		let maxCards = 3
		let isExpanded = false

		const updateCardsVisibility = () => {
			storiesCards.forEach((card, index) => {
				if (index < maxCards || isExpanded) {
					card.style.display = 'flex'
					gsap.to(card, {
						opacity: 1,
						duration: 0.3,
					})
				} else {
					gsap.to(card, {
						opacity: 0,
						duration: 0.3,
						onComplete: function () {
							card.style.display = 'none'
						},
					})
				}
			})
		}

		storiesBtnMore.addEventListener('click', () => {
			const buttonIcon = storiesBtnMore.querySelector('.icon-24px')
			const buttonTitle = storiesBtnMore.querySelector('.button-inline-text')
			isExpanded = !isExpanded
			updateCardsVisibility()
			if (isExpanded) {
				buttonTitle.textContent = 'Show Less'
				gsap.to(buttonIcon, {
					rotation: 180,
					duration: 0.3,
				})
			} else {
				buttonTitle.textContent = 'Show More'
				gsap.to(buttonIcon, {
					rotation: 0,
					duration: 0.3,
				})
			}
		})

		updateCardsVisibility()
	})

	//ahead-cards
	// gsap.registerPlugin(ScrollTrigger);

	// let cardsAhead = gsap.utils.toArray(".ahead-cards");
	// let counter = document.querySelector("[data-card-active]"); // Счетчик карточек
	// let totalCards = cardsAhead.length;
	// let angle = 360 / totalCards;
	// let depth = Math.round((300 / 2) / Math.tan(Math.PI / totalCards));
	
	// // Устанавливаем стартовые позиции карточек
	// cardsAhead.forEach((card, index) => {
	//   gsap.set(card, {
	// 	rotationY: index * angle,
	// 	transformOrigin: `50% 50% -${depth}px`,
	// 	zIndex: 1,
	// 	scale: 0.8,
	// 	opacity: 0.5
	//   });
	// });
	
	// // Создаём анимацию скролла
	// let scrollAnim = gsap.to(cardsAhead, {
	//   rotationY: `-=${360}`,
	//   transformOrigin: `50% 50% -${depth}px`,
	//   scrollTrigger: {
	// 	trigger: ".section_ahead",
	// 	pin: ".ahead__main",
	// 	scrub: 1,
	// 	start: "top top",
	// 	end: "+=300%",
	// 	onUpdate: (self) => {
	// 	  if (!self || typeof self.progress === "undefined") return; // Проверяем, есть ли progress
	// 	  let activeIndex = Math.round((self.progress * totalCards) % totalCards);
	
	// 	  cardsAhead.forEach((card, index) => {
	// 		let isActive = index === activeIndex;
	
	// 		gsap.to(card, {
	// 		  zIndex: isActive ? 10 : 1,
	// 		  scale: isActive ? 1 : 0.8,
	// 		  opacity: isActive ? 1 : 0.5,
	// 		  duration: 0.5
	// 		});
	// 	  });
	
	// 	  counter.textContent = `0${activeIndex + 1}`;
	// 	}
	//   }
	// });

	// gsap.registerPlugin(ScrollTrigger);

	// const cardsAhead = document.querySelectorAll(".ahead-cards");
	// const counter = document.querySelector("[data-card-active]"); // элемент счетчика
	// const total = cardsAhead.length;

	// // Обновляем общий счетчик
	// document.querySelector("[data-counter-total]").textContent = total.toString();

	// cardsAhead.forEach((card, index) => {
	// gsap.to(card, {
	// 	scrollTrigger: {
	// 	trigger: card,
	// 	start: "top center",
	// 	end: "bottom center",
	// 	toggleActions: "play reverse play reverse",
	// 	onEnter: () => updateCounter(index + 1),
	// 	onEnterBack: () => updateCounter(index + 1),
	// 	},
	// });
	// });

	// function updateCounter(value) {
	// counter.textContent = value.toString().padStart(2, "0"); // Формат 01, 02 и т. д.
	// }


	// if (window.innerWidth >= 479) {
	// 	gsap.utils.toArray(".ahead-cards").forEach((card, index, cards) => {
	// 		gsap.to(card, {
	// 		x: index * 8 + "em", // Смещение карточек в em
	// 		ease: "power2.out",
	// 		scrollTrigger: {
	// 			trigger: ".section_ahead",
	// 			start: "top 20%",
	// 			end: "bottom bottom",
	// 			scrub: true,
	// 			onUpdate: (self) => {
	// 			let progress = self.progress * (cards.length - 1); // Вычисляем прогресс
	// 			let activeIndex = Math.round(progress); // Определяем текущую активную карточку
		
	// 			cards.forEach((c, i) => {
	// 				gsap.to(c, {
	// 				opacity: i < activeIndex ? 0.1 : i === activeIndex ? 1 : 0, // 0 для ещё не активных, 0.3 для уже прошедших
	// 				backdropFilter: i === activeIndex ? "blur(1em)" : "blur(0em)", // Эффект блюра для активной карточки
	// 				webkitBackdropFilter: i === activeIndex ? "blur(1em)" : "blur(0em)", // Для Safari
	// 				duration: 0.3, // Плавный переход
	// 				});
	// 			});
	// 			}
	// 		}
	// 		});
	// 	});
	// }

	if (window.innerWidth >= 479) {
		gsap.utils.toArray(".ahead-cards").forEach((card, index, cards) => {
			gsap.to(card, {
				x: index * 8 + "em", // Смещение карточек в em
				ease: "power2.out",
				scrollTrigger: {
					trigger: ".section_ahead",
					start: "top 20%",
					end: "bottom bottom",
					scrub: true,
					onUpdate: (self) => {
						let progress = self.progress * (cards.length - 1); // Вычисляем прогресс
						let activeIndex = Math.round(progress); // Определяем текущую активную карточку
	
						cards.forEach((c, i) => {
							gsap.to(c, {
								opacity: i < activeIndex ? 0.1 : i === activeIndex ? 1 : 0, 
								backdropFilter: i === activeIndex ? "blur(1em)" : "blur(0em)", 
								webkitBackdropFilter: i === activeIndex ? "blur(1em)" : "blur(0em)", 
								duration: 0.3,
							});
						});
	
						// Обновляем номер активной карточки в data-card-active
						let cardIndicator = document.querySelector("[data-card-active]");
						if (cardIndicator) {
							cardIndicator.textContent = (activeIndex + 1).toString().padStart(2, "0");
						}
					}
				}
			});
		});
	}
	
	  
	  
	  
	  

	
	
	



	
	
	
	
	
	










})
