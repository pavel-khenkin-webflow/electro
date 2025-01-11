import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import Lenis from 'lenis'
import Swiper from 'swiper'

const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add(time => {
	lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)
// register plugins
gsap.registerPlugin(ScrollTrigger, SplitText)

document.addEventListener('DOMContentLoaded', function () {
	let mm = gsap.matchMedia()
	// FEATURES =================================
	const techCards = document.querySelectorAll('[data-tech-card]')

	techCards.forEach(card => {
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

	mm.add('(min-width: 767px)', () => {
		const pointCard01 = document.querySelector('[data-point-card="01"]')
		const pointCard02 = document.querySelector('[data-point-card="02"]')

		const pointTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.tech-point_slider',
				start: 'center center',
				end: 'bottom bottom',
				toggleActions: 'play none none reverse',
			},
		})
		pointTl.to(pointCard02, {
			visibility: 'visible',
		})
		pointTl.to(pointCard01, {
			opacity: 0,
			duration: 0.5,
			ease: 'none',
		})
		pointTl.to(
			pointCard02,
			{
				opacity: 1,
				duration: 0.5,
				ease: 'none',
			},
			'<'
		)
		pointTl.to(pointCard01, {
			visibility: 'hidden',
		})
	})

	mm.add('(max-width: 766px)', () => {
		const pointSwiper = new Swiper('.tech-point_slider', {
			slidesPerView: 1,
			spaceBetween: 16,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
			},
			loop: true,
		})
	})

	//metrics ===========================================

	const metricsNums = document.querySelectorAll('.metrics_card .h2-64px')

	metricsNums.forEach(numText => {
		const num = numText.textContent.replace(/\D/g, '')
		const nonNums = numText.textContent.replace(/\d/g, '')

		numText.innerHTML = `<span class="number">${num}</span>${nonNums}`

		gsap.fromTo(
			numText.querySelector('.number'),
			{
				innerText: 0,
			},
			{
				innerText: num,
				duration: 2,
				ease: 'none',
				scrollTrigger: {
					trigger: '.section_metrics',
					start: 'top center',
					end: 'bottom bottom',
				},
				onUpdate: function () {
					numText.querySelector('.number').innerText = Math.floor(
						numText.querySelector('.number').innerText
					)
				},
			}
		)
	})

	// PEM TABS ===========================
	const pemTabBtns = document.querySelectorAll('.pem_left-card')
	const pemTabCards = document.querySelectorAll('.pem_content-slide')

	// Устанавливаем первый таб как активный по умолчанию
	pemTabBtns[0].classList.add('is--active')
	pemTabCards[0].style.opacity = 1

	pemTabBtns.forEach((tab, index) => {
		tab.addEventListener('click', () => {
			// Добавляем класс активности на выбранный таб
			pemTabBtns.forEach(btn => btn.classList.remove('is--active'))
			tab.classList.add('is--active')

			// Переключаем карточки
			pemTabCards.forEach(card => {
				const cardValue = card.getAttribute('data-pem-card')
				const tabValue = tab.getAttribute('data-pem-tab')

				if (cardValue === tabValue) {
					gsap.to(card, {
						opacity: 1,
						duration: 0.5,
						position: 'relative',
						zIndex: 1,
					})
				} else {
					gsap.to(card, {
						opacity: 0,
						duration: 0.5,
						position: 'absolute',
						zIndex: -1,
					})
				}
			})
		})
	})

	// TRANSPORT
	const transportTl = gsap.timeline({
		scrollTrigger: {
			trigger: '.transport_content',
			start: 'top top',
			end: 'bottom bottom',
			scrub: true,
		},
	})
	transportTl.to('[data-transport-card="01"]', {
		scale: 0.95,
		opacity: 0.2,
	})
})
