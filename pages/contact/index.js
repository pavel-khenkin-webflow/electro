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

	// NEWS LINES
	const imagesWrapper = document.querySelectorAll('.news_line')

	// lOGO SLIDER ANIMA
	imagesWrapper.forEach(wrapper => {
		gsap.to(wrapper, {
			xPercent: -100,
			repeat: -1,
			duration: 25,
			ease: 'linear',
		})
	})
})
