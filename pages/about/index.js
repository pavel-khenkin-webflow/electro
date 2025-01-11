import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import Swiper from 'swiper'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
// register plugins
gsap.registerPlugin(ScrollTrigger, SplitText)

document.addEventListener('DOMContentLoaded', function () {
	const lenis = new Lenis()
	lenis.on('scroll', ScrollTrigger.update)
	gsap.ticker.add(time => {
		lenis.raf(time * 1000)
	})
	gsap.ticker.lagSmoothing(0)

	// MIND =================================
	const mindTitleSplit = new SplitText('[data-animate="about-title"]', {
		type: 'words, chars',
	})
	gsap.to(mindTitleSplit.chars, {
		color: 'var(--colors-text--white)',
		stagger: 0.1,
		scrollTrigger: {
			trigger: '.section_about-hero',
			start: 'top top',
			end: 'top+=100vh bottoms',
			scrub: 1,
		},
	})

	// RUN LINES
	const imagesWrapper = document.querySelectorAll('.about-hero_line')
	imagesWrapper.forEach(wrapper => {
		gsap.to(wrapper, {
			xPercent: -100,
			repeat: -1,
			duration: 25,
			ease: 'linear',
		})
	})

	// ABOUT POINTS
	const slides = document.querySelectorAll('.about_slider-slide')
	const totalSlides = slides.length

	gsap.set(slides, {
		opacity: 0,
		position: 'absolute',
		zIndex: -1,
	})

	gsap.set(slides[0], {
		opacity: 1,
		position: 'relative',
		zIndex: 1,
	})

	ScrollTrigger.create({
		trigger: '.section_about-slider',
		start: 'top top',
		end: 'bottom bottom',
		scrub: true,
		onUpdate: self => {
			const progress = self.progress

			// Первая карточка
			if (progress >= 0 && progress < 0.33) {
				gsap.to(slides[0], {
					opacity: 1,
					position: 'relative',
					zIndex: 1,
					duration: 0.5,
				})
				gsap.to(slides[1], {
					opacity: 0,
					position: 'absolute',
					zIndex: -1,
					duration: 0.5,
				})
				gsap.to(slides[2], {
					opacity: 0,
					position: 'absolute',
					zIndex: -1,
					duration: 0.5,
				})
			}

			// Вторая карточка
			if (progress >= 0.33 && progress < 0.66) {
				gsap.to(slides[1], {
					opacity: 1,
					position: 'relative',
					zIndex: 1,
					duration: 0.5,
				})
				gsap.to(slides[0], {
					opacity: 0,
					position: 'absolute',
					zIndex: -1,
					duration: 0.5,
				})
				gsap.to(slides[2], {
					opacity: 0,
					position: 'absolute',
					zIndex: -1,
					duration: 0.5,
				})
			}

			// Третья карточка
			if (progress >= 0.66) {
				gsap.to(slides[2], {
					opacity: 1,
					position: 'relative',
					zIndex: 1,
					duration: 0.5,
				})
				gsap.to(slides[0], {
					opacity: 0,
					position: 'absolute',
					zIndex: -1,
					duration: 0.5,
				})
				gsap.to(slides[1], {
					opacity: 0,
					position: 'absolute',
					zIndex: -1,
					duration: 0.5,
				})
			}
		},
	})

	// RUN LINES
	const DirectorsLines = document.querySelectorAll('.directos_line')
	DirectorsLines.forEach(wrapper => {
		gsap.to(wrapper, {
			xPercent: -100,
			repeat: -1,
			duration: 25,
			ease: 'linear',
		})
	})

	// DIRECTORS
	const directorsSwiper = new Swiper('.directos_slider', {
		modules: [Autoplay, Navigation, Pagination],
		loop: true,
		slidesPerView: 1,
		speed: 600,
		autoplay: {
			delay: 2000,
		},
		navigation: {
			nextEl: '#directors-btn-next',
			prevEl: '#directors-btn-prev',
		},
		pagination: {
			el: '.directors_pagination',
			type: 'custom', // Используем кастомный рендер
			renderCustom: function (swiper, current, total) {
				// Разделяем номер текущего слайда
				const currentStr = current.toString()
				const firstDigit = currentStr.charAt(0)
				const restDigits = currentStr.slice(1)

				return `<span class="first-digit">${firstDigit}</span>${restDigits} / ${total}`
			},
		},
	})

	// Инициализация слайдера
	const jorneySlider = new Swiper('.way_slider', {
		slidesPerView: 'auto',
		spaceBetween: 24,
		watchSlidesProgress: true,
		on: {
			init: function () {
				initializeTabs(this) // Передаем текущий слайдер в функцию
			},
			slideChange: function () {
				// Сюда можно добавить код, если нужно что-то сделать при изменении слайда
			},
		},
	})

	// Функция для инициализации табов
	function initializeTabs(swiperInstance) {
		const tabs = document.querySelectorAll('.way_pafination-tag')
		const slides = Array.from(swiperInstance.slides) // Получаем все слайды из переданного swiperInstance

		// Перебираем все табы
		tabs.forEach(tab => {
			const tabDataPag = tab.getAttribute('data-pag')
			const matchingSlide = slides.find(
				slide =>
					slide.querySelector('.way_tag').getAttribute('data-tag') ===
					tabDataPag
			)

			// Если таб не соответствует ни одному слайду, добавляем класс 'is--disabled'
			if (!matchingSlide) {
				tab.classList.add('is--disabled')
			}
		})

		// Добавляем обработчики кликов только для доступных табов
		document
			.querySelectorAll('.way_pafination-tag:not(.is--disabled)')
			.forEach(tab => {
				tab.addEventListener('click', function () {
					// Получаем tag, который соответствует табу
					const targetTag = tab.getAttribute('data-pag')

					// Убираем класс "is--active" у всех табов
					document
						.querySelectorAll('.way_pafination-tag')
						.forEach(t => t.classList.remove('is--active'))

					// Добавляем класс "is--active" на текущий таб
					tab.classList.add('is--active')

					// Находим слайд, который соответствует данному табу
					const targetSlide = Array.from(swiperInstance.slides).find(
						slide =>
							slide.querySelector('.way_tag').getAttribute('data-tag') ===
							targetTag
					)

					// Если такой слайд найден, активируем его
					if (targetSlide) {
						const slideIndex = Array.from(swiperInstance.slides).indexOf(
							targetSlide
						)
						swiperInstance.slideTo(slideIndex) // Перемещаем слайдер на соответствующий слайд
					}
				})
			})
	}

	// Partners ======================
	const prtTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.part_trigger',
			start: 'top top',
			end: 'bottom bottom',
			scrub: true,
		},
	})
	prtTl.to('[data-part-line="top"]', {
		x: '20%',
	})
	prtTl.to(
		'[data-part-line="bot"]',
		{
			x: '-20%',
		},
		'<'
	)
})
