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
})
