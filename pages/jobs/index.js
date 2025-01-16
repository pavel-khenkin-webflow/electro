import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import Swiper from 'swiper'
import { Navigation } from 'swiper/modules'
import { setupHeaderAnimations } from '../../utils/header'
// register plugins
gsap.registerPlugin(ScrollTrigger, SplitText)

document.addEventListener('DOMContentLoaded', function () {
	const lenis = new Lenis()
	lenis.on('scroll', ScrollTrigger.update)
	gsap.ticker.add(time => {
		lenis.raf(time * 1000)
	})
	gsap.ticker.lagSmoothing(0)

	// HEADER
	setupHeaderAnimations()

	// HERO

	const heroCards = document.querySelectorAll('.jobs-hero_card')
	const heroTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.jobs-wrapper.is--top',
			start: 'top 5%',
			end: 'bottom bottom',
			scrub: true,
		},
	})
	heroTl.to('.jobs-hero_card', {
		x: '-80%',
	})

	// MIND =================================
	const mindTitleSplit = new SplitText('[data-animate="mind-title"]', {
		type: 'words, chars',
	})
	gsap.to(mindTitleSplit.chars, {
		color: 'var(--colors-text--white)',
		stagger: 0.1,
		scrollTrigger: {
			trigger: '.section_jobs-mind',
			start: 'top center+=20vh',
			end: 'top+=100vh bottoms',
			scrub: 1,
		},
	})

	// STEPS===============================
	const stepsCards = document.querySelectorAll('.jobs_steps_card')

	stepsCards.forEach(card => {
		const cardContent = card.querySelector('.jobs_steps_card-text')
		const tab = card.querySelector('.jobs_steps-tag')

		card.addEventListener('click', () => {
			const isActive = tab.classList.contains('is--active')

			// Деактивируем все карточки перед активацией текущей
			stepsCards.forEach(otherCard => {
				const otherContent = otherCard.querySelector('.jobs_steps_card-text')
				const otherTab = otherCard.querySelector('.jobs_steps-tag')

				if (otherTab.classList.contains('is--active')) {
					gsap.to(otherContent, {
						opacity: 0,
						duration: 0.3,
						onComplete: function () {
							otherTab.classList.remove('is--active')
						},
					})
				}
			})

			// Активируем текущую карточку, если она не была активной
			if (!isActive) {
				gsap.to(cardContent, {
					opacity: 1,
					duration: 0.3,
					onComplete: function () {
						tab.classList.add('is--active')
					},
				})
			}
		})
	})

	stepsCards[0].click()

	// JOBS SLIDER
	// JOBS SLIDER
	const selects = document.querySelectorAll('.jobs_select')
	const cards = document.querySelectorAll('.jobs_card')

	// Инициализация фильтров
	const filters = {
		location: 'all',
		workType: 'all',
	}

	// Маппинг ID селектов в ключи фильтров
	const filterMap = {
		location: 'location',
		'work-type': 'workType',
	}

	// Обработка селектов
	selects.forEach(select => {
		const trigger = select.querySelector('.jobs_select-trigger')
		const options = select.querySelectorAll('.jobs_select-option')
		const triggerText = select.querySelector('.jobs_select-trigger-text')

		// Устанавливаем текст по умолчанию
		if (select.id === 'location') {
			triggerText.textContent = 'Any Location'
		} else if (select.id === 'work-type') {
			triggerText.textContent = 'Different job formats'
		}

		// Открытие/закрытие селекта
		trigger.addEventListener('click', () => {
			const isOpen = select.classList.contains('open')
			select.classList.toggle('open', !isOpen)
		})

		// Обработка клика на опцию
		options.forEach(option => {
			option.addEventListener('click', () => {
				const selectId = select.getAttribute('id')
				console.log(selectId)
				const value = option.getAttribute('data-option')
				const optionText = option.querySelector(
					'.job_select-option-text'
				).textContent

				triggerText.textContent = optionText

				select.classList.remove('open')

				// Чётко обновляем фильтры в зависимости от ID селекта
				if (selectId === 'location') {
					filters.location = value
					console.log(`Обновляем фильтр "location": ${value}`)
				} else if (selectId === 'work-type') {
					filters.workType = value
					console.log(`Обновляем фильтр "workType": ${value}`)
				} else {
					console.error(`Неизвестный ID селекта: ${selectId}`)
				}

				console.log('Текущие фильтры после обновления:', filters)

				// Фильтруем карточки
				filterCards()
			})
		})
	})

	function filterCards() {
		const matchingCards = [] // Массив для отфильтрованных карточек

		// Проверяем карточки на соответствие фильтрам и собираем подходящие
		cards.forEach(card => {
			const location = card
				.querySelector('.jobs_tag-loc')
				.getAttribute('data-location')
			const workType = card
				.querySelector('.jobs_tag-time')
				.getAttribute('data-tag')

			const matchesLocation =
				filters.location === 'all' || filters.location === location
			const matchesWorkType =
				filters.workType === 'all' || filters.workType === workType

			if (matchesLocation && matchesWorkType) {
				matchingCards.push(card) // Добавляем подходящие карточки в массив
			}
		})

		// Сначала скрываем все карточки
		gsap.to(cards, {
			opacity: 0,
			duration: 0.3,
			onComplete: () => {
				cards.forEach(card => {
					card.style.display = 'none' // Скрываем все карточки
				})

				// Показываем отфильтрованные карточки
				matchingCards.forEach(card => {
					card.style.display = 'flex' // Делаем карточку видимой
				})

				// Плавно показываем все отфильтрованные карточки разом
				gsap.to(matchingCards, {
					opacity: 1,
					duration: 0.3,
					onComplete: function () {
						ScrollTrigger.update()
					},
				})
			},
		})
	}

	// Вызов фильтрации при загрузке страницы
	ScrollTrigger.update()
	filterCards()
	ScrollTrigger.update()

	// SLIDER
	const reviewsSwiper = new Swiper('.j-reviews_slider', {
		modules: [Navigation],
		slidesPerView: 'auto',
		spaceBetween: 32,
		centeredSlides: true,
		navigation: {
			nextEl: '#j-btn-next',
			prevEl: '#j-btn-prev',
		},
	})
	//Дождь из кнопок

	// Функция для анимации элементов внутри каждого `data-row`
	function animateRowElements(rowSelector, delay = 0) {
		const row = document.querySelector(`[data-row="${rowSelector}"]`);
		if (!row) {
			console.warn(`Row with selector [data-row="${rowSelector}"] not found`);
			return;
		}

		const elements = row.querySelectorAll(".lines_line-card_inline-block");
		if (elements.length === 0) {
			console.warn(`No elements found in row ${rowSelector}`);
			return;
		}

		const trigger = document.querySelector(".section_jobs-mission");
		if (!trigger) {
			console.warn("Trigger element .section_jobs-mission not found");
			return;
		}

		gsap.fromTo(
			elements,
			{
				opacity: 0,
				y: -200,
				scale: 0.5,
			},
			{
				opacity: 1,
				y: 0,
				scale: 1,
				duration: 0.3,
				ease: "power2.out",
				stagger: {
					amount: 0.5,
					from: "random",
				},
				scrollTrigger: {
					trigger: ".section_jobs-mission", 
					start: "30% center",
					once: true,
				},
				delay,
			}
		);
	}

	// Анимация для каждого ряда
	animateRowElements("one", 0); // Первый ряд, без задержки
	animateRowElements("two", 0.5); // Второй ряд, задержка 1.5 секунды
	animateRowElements("three", 1); // Третий ряд, задержка 3 секунды





})
