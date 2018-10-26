import { Styles, Markup, Align, Effects } from 'ad-view'
import { Device } from 'ad-external'


export class Animation {
	static start() {
		console.log('Animation.start()')
		// show the main container
		global.removePreloader()
		Styles.setCss(View.main, { opacity: 1 })

		View.ribbon.play()

	}

	// IMPORTANT!!! Call this function when your animation is complete!
	static complete() {
		console.log('Animation.complete()')

	}

	static playIntro() {
		if (Device.type == 'desktop') {
			Styles.setCss(View.intro.netflixLogo,{ opacity:1 })
			View.intro.introVideoPlayer.play()

			TweenLite.delayedCall(2.5, function(){
				View.intro.netflixLogo.reverse()
			})
			TweenLite.delayedCall(6, function(){
				View.intro.netflixLogo.play()
			})
			TweenLite.to(View.intro.netflixLogo, .25, { delay:8, alpha:0 })
		} else {
			Animation.showEndFrame()
		}
	}

	
	static showEndFrame() {
		console.log('Animation.showEndFrame()')
		
		View.intro.hide()
		View.endFrame.show()

let delay = 0
TweenLite.from(View.endFrame.tunein, 0.5, { alpha: 0, delay: delay })
TweenLite.from(View.endFrame.ftm, 0.5, { alpha: 0, delay: delay })
TweenLite.from(View.endFrame.netflixLogo, 0.5, { alpha: 0, delay: delay })
TweenLite.from(View.endFrame.cta, 0.5, { alpha: 0, delay: delay })

TweenLite.delayedCall(delay, function() {
	View.endFrame.netflixLogo.play()
})


	}


}
