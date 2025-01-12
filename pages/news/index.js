import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import { setupHeaderAnimations } from '../../utils/header'
// register plugins
gsap.registerPlugin(ScrollTrigger, SplitText)

document.addEventListener('DOMContentLoaded', function () {
	console.log('shoto')
	const lenis = new Lenis()
	lenis.on('scroll', ScrollTrigger.update)
	gsap.ticker.add(time => {
		lenis.raf(time * 1000)
	})
	gsap.ticker.lagSmoothing(0)

	setupHeaderAnimations()

	// TABS
	const tabs = document.querySelectorAll('.all_tab')
	const tabCards = document.querySelectorAll('.all_box')

	// Функция для обновления активного таба и карточек
	const updateActiveTab = activeTabValue => {
		// Убираем активный класс у всех табов
		tabs.forEach(tab => tab.classList.remove('is--active'))

		// Устанавливаем активный класс на выбранный таб
		tabs.forEach(tab => {
			if (tab.getAttribute('data-tab') === activeTabValue) {
				tab.classList.add('is--active')
			}
		})

		// Показываем только карточки, соответствующие выбранному табу
		tabCards.forEach(card => {
			if (
				activeTabValue === 'all' ||
				card.getAttribute('data-content') === activeTabValue
			) {
				card.style.display = 'block'
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

	// Устанавливаем таб "all" активным по умолчанию
	updateActiveTab('all')

	// Обработчик клика на табы
	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			const tabValue = tab.getAttribute('data-tab')
			updateActiveTab(tabValue)
		})
	})
})
