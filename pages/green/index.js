import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
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

	setupHeaderAnimations()

	// HERO =================
	const heroTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_out',
			start: 'top center',
			end: 'bottom bottom',
			scrub: 2,
		},
	})
	heroTl.to('[data-hero-line="01"]', {
		maxWidth: '100%',
	})
	heroTl.to(
		'[data-hero-line="02"]',
		{
			maxWidth: '43%',
		},
		'<'
	)

	// OUT SLIDER
	const outCards = document.querySelectorAll('.out_slide')

	outCards.forEach(card => {
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
		})
	})

	//WHY CHOOSE
	const whyTitleSplit = new SplitText('.why-choose_content .text-48px', {
		type: 'words, chars',
	})
	gsap.to(whyTitleSplit.chars, {
		color: '#FFFFFF',
		stagger: 0.03,
		scrollTrigger: {
			trigger: '.section_why-choose',
			start: 'top center',
			end: 'bottom center',
			scrub: true,
			marker: true,
		},
	})

	// TABS
	const tabs = document.querySelectorAll('.econ_tab')
	const tabCards = document.querySelectorAll('.econ_tab-content')
	const contentParent = document.querySelector('.econ_content') // Родитель карточек

	// Функция для нахождения максимальной высоты карточек
	const setParentHeight = () => {
		const maxHeight = Math.max(
			...Array.from(tabCards).map(card => card.offsetHeight)
		)
		contentParent.style.height = `${maxHeight}px` // Устанавливаем высоту
	}

	// Дебаунс-функция для оптимизации вызова при ресайзе
	const debounce = (func, delay) => {
		let timeout
		return (...args) => {
			clearTimeout(timeout)
			timeout = setTimeout(() => func(...args), delay)
		}
	}

	// При загрузке страницы
	setParentHeight()

	// Устанавливаем первый таб и карточку как активные
	tabs[0].classList.add('is--active')
	tabCards[0].classList.add('is--active')

	// Обрабатываем клики по табам
	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			// Убираем классы активности
			tabs.forEach(t => t.classList.remove('is--active'))
			tabCards.forEach(card => card.classList.remove('is--active'))

			// Активируем текущий таб
			tab.classList.add('is--active')

			// Показываем соответствующий контент
			const target = tab.getAttribute('data-econ-tab')
			const matchingCard = document.querySelector(
				`.econ_tab-content[econ-tab-content="${target}"]`
			)
			if (matchingCard) {
				matchingCard.classList.add('is--active')
			}
		})
	})

	// Слушаем изменение размеров экрана и пересчитываем высоту
	window.addEventListener('resize', debounce(setParentHeight, 200))

	// GLOBAL
	const globalTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.section_global',
			start: 'top center',
			end: 'bottom center',
		},
	})
	globalTl.from('.global_card', {
		opacity: 0,
		top: '50%',
		left: '50%',
		transform: 'translate(-50% -50%)',
		duration: 1,
		stagger: 0.1,
	})

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
