/* BUILD SOURCE: Netflix Monet - Intro/Endframe Branded / OPTIONS:  / AdApp: 3.1.0 / AdHtml: v0.1.3 / Created: 07/24/18 10:59am */
import '@netflixadseng/wc-netflix-brand-logo'
import '@netflixadseng/wc-netflix-cta'
import '@netflixadseng/wc-netflix-text'
import '@netflixadseng/wc-netflix-img'
import { Styles, FullScreen, Markup, Align, Effects } from 'ad-view'
import { ImageManager, Core } from 'ad-control'
import { Gesture, GestureEvent } from 'ad-events'
import { Device } from 'ad-external'
import '@netflixadseng/wc-netflix-flushed-ribbon'
import { Common } from '@common/js/control/Common.js'
import '@netflixadseng/wc-netflix-video'
import '@netflixadseng/wc-netflix-fonts'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg } from 'ad-ui'
import { MonetUtils } from 'ad-utils'
import '@size/images/keyart.jpg'
import '@size/images/tt.png'
import '@size/images/pedigree.png'

/* -- CONTROL ----------------------------------------------------------------------------------------------------
 *
 *	API Docs are here: https://ff0000-ad-tech.github.io/ad-docs/
 *
 *
 */
window.Control = new function() {
	this.prepare = function(fbaContent) {
		console.log('Control.prepare()')
		Core.init(fbaContent)
			.then(() => {
				return Common.init()
			})
			.then(() => {
				return Core.loadDynamic()
			})
			.then(() => {
				this.prepareBuild()
			})
			.catch(err => {
				throw err
			})
	}

	// build runtime begins here ----------->
	this.prepareBuild = function() {
		console.log('Control.prepareBuild()')
		Control.preMarkup()

		View.main = new Main()
		View.intro = new Intro()
		View.endFrame = new EndFrame()
		View.ribbon = new NetflixRibbon()
		View.mainBorder = new MainBorder()
	}

	this.preMarkup = function() {
		console.log('Control.preMarkup()')

		View.netflixFonts = document.createElement('netflix-fonts')
		Markup.get('main').appendChild(View.netflixFonts)
	}

	this.postMarkup = function() {
		console.log('Control.postMarkup()')
		Gesture.add(View.endFrame, GestureEvent.CLICK, Control.handleClick)

		View.endFrame.hide()

		Gesture.add(View.endFrame, GestureEvent.OVER, function() {
			View.endFrame.cta.mouseover()
		})

		Gesture.add(View.endFrame, GestureEvent.OUT, function() {
			View.endFrame.cta.mouseout()
		})

		View.ribbon.addEventListener('coverComplete', function(event) {
			Animation.playIntro()
		})
	}

	// IMPORTANT!!! If this method has content, Call this function when your animation is complete!
	this.animationComplete = function() {
		console.log('Control.animationComplete()')
	}

	this.handleClick = function(event) {
		Network.exit(overridePlatformExit, MonetUtils.getDataByKey('Exit_URL'))
	}

	this.handleMonetLoadComplete = function(element) {
		console.log('Control.handleMonetLoadComplete()')
		MonetUtils.setData(element)
			.then(data => {
				console.log('	-> All Netflix web components ready')
				// monet data is now assigned to MonetUtils
				adData.hasFTM = MonetUtils.getDataByKey('FTM').length > 0 ? true : false
				adData.hasTuneIn = MonetUtils.getDataByKey('Tune_In').length > 0 ? true : false

				// Ratings Bug
				adData.hasRatings = MonetUtils.getDataByKey('Ratings_Bug_20x20').length > 0 ? true : false
				if( adData.hasRatings ) adData.ratingsSrc = ImageManager.addToLoad( MonetUtils.getDataByKey('Ratings_Bug_20x20'), { forCanvas: false })

				// proceed with ad AFTER the setData() Promise has been fulfilled
				ImageManager.load(function() {
					View.intro.postMarkupStyling()
					View.endFrame.postMarkupStyling()
					Control.postMarkup()
					Animation.startAd()
				})
			})
			.catch(error => {
				global.failAd()
			})
	}

	this.postMarkupStyling = function() {
	}

	this.handleIntroVideoComplete = function(event) {
		Animation.showEndFrame()
	}

	this.handleIntroClick = function(event) {
		View.intro.introVideoPlayer.pause()
		View.intro.hide()
		Animation.showEndFrame()
		Control.handleClick()
	}
}()

/* -- VIEW ------------------------------------------------------------------------------------------------------
 *
 *	API Docs are here: https://ff0000-ad-tech.github.io/ad-docs/
 *
 */

// ==============================================================================================================
function Main() {
	var T = Markup.get('main')
	Styles.setCss(T, {
		position: 'absolute',
		width: adParams.adWidth,
		height: adParams.adHeight,
		opacity: 0,
		left: '0px',
		top: '0px',
		overflow: 'hidden',
		userSelect: 'none'
	})

	Styles.setCss(T, { backgroundColor: '#ffffff' })

	return T
}

// ==============================================================================================================
function Intro() {
	var T = new UIComponent({
		id: 'intro-container',
		target: View.main,
		css: {
			width: 'inherit',
			height: 'inherit'
		}
	})

	T.introVideoPlayer = document.createElement('netflix-video')
	T.introVideoPlayer.id = 'intro-video'
	T.introVideoPlayer.setAttribute('width', adParams.adWidth)
	T.introVideoPlayer.setAttribute('height', adParams.adHeight)
	T.introVideoPlayer.setAttribute('close-color-1', adData.colors.red)
	T.introVideoPlayer.setAttribute('close-color-2', adData.colors.white)
	T.introVideoPlayer.setAttribute('data-dynamic-key', 'Supercut')
	T.introVideoPlayer.setAttribute('muted', '')
	//T.introVideoPlayer.setAttribute('autoplay', '')
	T.introVideoPlayer.addEventListener('video-click', Control.handleIntroClick)
	T.introVideoPlayer.addEventListener('video-complete', Control.handleIntroVideoComplete)
	T.introVideoPlayer.addEventListener('video-close', Animation.showEndFrame)
	T.appendChild(T.introVideoPlayer)

	T.netflixLogo = document.createElement('netflix-brand-logo')
	T.netflixLogo.setAttribute('width', 90)
	T.appendChild(T.netflixLogo)

	T.postMarkupStyling = function(){

		let T = View.intro

		Styles.setCss(View.intro.netflixLogo, { opacity: 0 })
		Align.set( T.netflixLogo, {
			x: {
				type: Align.LEFT,
				offset: 10
			},
			y: {
				type: Align.BOTTOM,
				offset: -10
			}
		})
	}

	return T
}

// ==============================================================================================================
function EndFrame() {
	var T = new UIComponent({
		id: 'end-frame-container',
		target: View.main,
		css: {
			width: 'inherit',
			height: 'inherit'
		}
	})

	T.keyart = new UIImage({
		id: 'keyart',
		target: T,
		source: 'keyart'
	})

	T.pedigree = new UIImage({
		id: 'pedigree',
		target: T,
		source: 'pedigree',
		retina: true
	})

	T.tt = new UIImage({
		id: 'tt',
		target: T,
		source: 'tt',
		retina: true
	})

	T.ftm = document.createElement('netflix-text')
	T.ftm.setAttribute('data-dynamic-key', 'FTM')
	T.appendChild(T.ftm)

	T.tunein = document.createElement('netflix-text')
	T.tunein.setAttribute('data-dynamic-key', 'Tune_In')
	T.appendChild(T.tunein)

	T.netflixLogo = document.createElement('netflix-brand-logo')
	T.netflixLogo.setAttribute('width', 90)
	T.appendChild(T.netflixLogo)

	T.cta = document.createElement('netflix-cta')
	T.cta.setAttribute('data-dynamic-key', 'CTA')
	T.cta.setAttribute('arrow', '')
	T.cta.setAttribute('border', '')
	T.cta.setAttribute('width', 90)
	T.cta.setAttribute('height', 24)
	T.appendChild(T.cta)
	
	T.postMarkupStyling = function(){

		let T = View.endFrame

		// Ratings Bug
		if ( adData.hasRatings ) {
			T.ratingsBug = new UIImage({
				target: T,
				id: 'ratingsBug',
				source: adData.ratingsSrc,
				css: {
					width: 20,
					height: 20
				}
			})

			Align.set( T.ratingsBug, {
				x: {
					type: Align.RIGHT,
					offset: -5
				},
				y: {
					type: Align.BOTTOM,
					offset: -5
				}
			})
		}
		
		Styles.setCss( T.tunein, {
			color: '#fff',
			fontSize: 16,
			letterSpacing: 1,
			textAlign: 'center',
			visibility: adData.hasFTM ? 'hidden' : 'visible'
		})
		Align.set(T.tunein, {
			x: Align.CENTER,
			y: {
				type: Align.TOP,
				offset: 184
			}
		})

		Styles.setCss( T.ftm, {
			color: '#fff',
			fontSize: 14,
			letterSpacing: 1,
			textAlign: 'center',
			visibility: adData.hasFTM ? 'visible' : 'hidden'
		})
		Align.set(T.ftm, {
			x: Align.CENTER,
			y: {
				type: Align.TOP,
				offset: 184
			}
		})

		Align.set(T.netflixLogo, {
			x: {
				type: Align.LEFT,
				offset: 44
			},
			y: {
				type: Align.TOP,
				offset: 210
			}
		})

		T.cta.resize()
		Align.set(T.cta, {
			x: {
				type: Align.LEFT,
				offset: 166
			},
			y: {
				type: Align.TOP,
				offset: 210
			}
		})
	}

	return T
}

// ==============================================================================================================
function NetflixRibbon() {
	var T = document.createElement('netflix-flushed-ribbon')
	T.setAttribute('width', adParams.adWidth)
	T.setAttribute('height', adParams.adHeight)
	T.style.position = 'absolute'
	View.main.appendChild(T)
	return T
}

// ==============================================================================================================
function MainBorder() {
	new UIBorder({
		target: View.main,
		size: 1,
		color: '#000'
	})
}

/* -- ANIMATION -------------------------------------------------------------------------------------------------
 *
 *	Greensock Docs are here: https://greensock.com/docs
 *
 */
window.Animation = new function() {
	this.startAd = function() {
		console.log('Animation.startAd()')

		// show the main container
		global.removePreloader()
		Styles.setCss(View.main, { opacity: 1 })

		View.ribbon.play()
	}

	this.playIntro = function() {
		if (Device.type == 'desktop') {
			Styles.setCss(View.intro.netflixLogo, { opacity: 1 })
			View.intro.introVideoPlayer.play()

			TweenLite.delayedCall(5, function() {
				View.intro.netflixLogo.reverse()
			})
			TweenLite.delayedCall(.5, function() {
				View.intro.netflixLogo.play()
			})
			TweenLite.to(View.intro.netflixLogo, 0.25, { delay: 5.9, alpha: 0 })
		} else {
			Animation.showEndFrame()
		}
	}

	this.showEndFrame = function() {
		console.log('Animation.showEndFrame()')

		var EF = View.endFrame
		var IN = View.intro

		IN.hide()
		EF.show()

		let delay = 0
		TweenLite.from( EF.tunein, .5, { alpha: 0, delay: delay })
		TweenLite.from( EF.ftm, .5, { alpha: 0, delay: delay })
		TweenLite.from( EF.netflixLogo, .5, { alpha:0, delay: delay })
		TweenLite.from( EF.cta, .5, { alpha: 0, delay: delay })

		TweenLite.delayedCall( delay, function(){
			EF.netflixLogo.play()
		})
	}
}()
