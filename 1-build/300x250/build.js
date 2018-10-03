/* BUILD SOURCE: Netflix Monet - Intro/Endframe Branded / OPTIONS:  / @ff0000-ad-tech/tmpl-build-sources: 1.0.1 / Created: 10/03/18 04:07pm */
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
import '@size/images/default_300x250.jpg'
import { MonetUtils } from 'ad-utils'


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
				throw(err)
			})
	}

	// build runtime begins here ----------->
	this.prepareBuild = function() {
		console.log('Control.prepareBuild()')
		Control.preMarkup()


		View.main = new Main()
		View.intro = new Intro()
		View.endFrame = new EndFrame()
		View.trailerFrame = new TrailerFrame()
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
		Gesture.add(View.trailerFrame.bg, GestureEvent.CLICK, Control.handleTrailerFrameClick)



		View.endFrame.hide()
		
		Gesture.add(View.endFrame, GestureEvent.OVER, function(){
			View.endFrame.cta.mouseover()
		})
		Gesture.add(View.endFrame, GestureEvent.OUT, function(){
			View.endFrame.cta.mouseout()
		})
		Gesture.add(View.trailerFrame.bg, GestureEvent.OVER, function(){
			View.trailerFrame.cta.mouseover()
		})
		Gesture.add(View.trailerFrame.bg, GestureEvent.OUT, function(){
			View.trailerFrame.cta.mouseout()
		})
		View.trailerFrame.hide()

		View.trailerFrame.mainVideoPlayer.addEventListener('video-close', Animation.hideTrailerFrame)
		View.trailerFrame.mainVideoPlayer.addEventListener('video-complete', Animation.hideTrailerFrame)
		View.ribbon.addEventListener('coverComplete', function(event) {
			Animation.playIntro()
		})


	}

	// IMPORTANT!!! If this method has content, Call this function when your animation is complete!
	this.animationComplete = function() {
		console.log('Control.animationComplete()')

	}

	this.handleClick = function(event) {	

		Network.exit( 
			overridePlatformExit, 
			MonetUtils.getDataByKey('Exit_URL')
		); 
	}




	this.handleMonetLoadComplete = function(element) {
		console.log('Control.handleMonetLoadComplete()')
		MonetUtils.setData(element)
			.then(data => {
				console.log('	-> All Netflix web components ready')
				// monet data is now assigned to MonetUtils
				adData.hideStack = MonetUtils.getDataByKey('hideStack')

				// proceed with ad AFTER the setData() Promise has been fulfilled
				Control.postMarkupStyling()
				Control.postMarkup()
				Animation.startAd()
			})
			.catch(error => {
				global.failAd()
			})
	}
	
	this.postMarkupStyling = function(){
		Styles.setCss(View.endFrame.pedigree, {
			color: '#ffffff',
			fontFamily: 'Netflix Sans'
		});
		Align.set(View.endFrame.pedigree, {
			x: Align.CENTER,
			y: {
				type: Align.CENTER,
				offset: 12
			}	
		})

		View.intro.netflixLogo.progress(1)
		Styles.setCss(View.intro.netflixLogo, { opacity: 0 })
		Align.set(View.intro.netflixLogo, {
			x: {
				type: Align.LEFT,
				offset: 12					
			},
			y: {
				type: Align.BOTTOM,
				offset: -11,
			}	
		})

		Align.set(View.endFrame.cta, {
			x: {
				type: Align.RIGHT,
				offset: -12
			},
			y: {
				type: Align.BOTTOM,
				offset: -12
			}
		})

		Align.set(View.trailerFrame.cta, {
			x: {
				type: Align.RIGHT,
				offset: -12
			},
			y: {
				type: Align.BOTTOM,
				offset: -12
			}
		})

		Align.set(View.endFrame.netflixLogo, {
			x: {
				type: Align.LEFT,
				offset: 12					
			},
			y: {
				type: Align.BOTTOM,
				offset: -11,
			}	
		})

		Align.set(View.trailerFrame.netflixLogo, {
			x: {
				type: Align.LEFT,
				offset: 12					
			},
			y: {
				type: Align.BOTTOM,
				offset: -11,
			}	
		})


	}
	
	this.handleIntroVideoComplete = function(event) {
		Animation.showEndFrame()

	}

	this.handleIntroClick = function(event) {
		View.intro.hide()
		Animation.showEndFrame()
		Control.handleClick()
	}
	
	this.handleTrailerFrameClick = function(event) {
		console.log('Control.handleTrailerFrameClick()')
		Animation.hideTrailerFrame()
		Control.handleClick(event)
	}


}

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

Styles.setCss(T, { backgroundColor:'#ffffff' });


	return T
}


// ==============================================================================================================
function Intro(){
	var T = new UIComponent({
		id : 'intro-container',
		target : View.main,
		css : {
			width : 'inherit',
			height : 'inherit'
		}
	})

	T.introVideoPlayer = document.createElement('netflix-video')
	T.introVideoPlayer.id = "intro-video"
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
	T.appendChild(T.netflixLogo)
		
		


	return T
}

// ==============================================================================================================
function EndFrame(){
	var T = new UIComponent({
		id : 'end-frame-container',
		target : View.main,
		css : {
			width : 'inherit',
			height : 'inherit'
		}
	})

	T.bg = document.createElement('netflix-img')
	T.bg.setAttribute('id', 'endframe-bg')
	T.bg.setAttribute('data-dynamic-key', 'endframe_bg_300x250')
	T.appendChild(T.bg)

	T.pedigree = document.createElement('netflix-text')
	T.pedigree.setAttribute('data-dynamic-key', 'Pedigree')
	T.appendChild(T.pedigree)
	
	T.netflixLogo = document.createElement('netflix-brand-logo')
	T.appendChild(T.netflixLogo)
		
		
	T.playBtn = new UIButton({
		id: 'cicle-play-btn',
		target: T,
		css: {
			width: 44,
			height: 44
		},
		align: Align.RIGHT,
		icon: [
			new UISvg({
				source: adData.svg.circle_play_btn,
				css: {
					width: 24,
					height: 24
				},
				align: Align.CENTER
			}),
		],
		onClick: Animation.showTrailerFrame,
		onOver: function() {
			TweenLite.set('.play_btn_svg_circle', { fill: adData.colors.white });
			TweenLite.set('.play_btn_svg_arrow', { fill: adData.colors.red });
		},
		onOut: function() {
			TweenLite.set('.play_btn_svg_circle', { fill: adData.colors.red });
			TweenLite.set('.play_btn_svg_arrow', { fill: adData.colors.white });
		}			
	})	

	T.cta = document.createElement('netflix-cta')
	T.cta.setAttribute('data-dynamic-key', 'CTA')
	T.cta.setAttribute('arrow', '')
	T.cta.setAttribute('border', '')
	T.appendChild(T.cta)



	return T
}


// ==============================================================================================================
function TrailerFrame(){		
	var T = new UIComponent ({
		id: 'trailer-frame',
		target: View.main,
		css: {
			width: adParams.adWidth,
			height: adParams.adHeight,
		}
	})

	T.hide = function(){
		TweenLite.set( T, { y: -adParams.adHeight } )
	}

	T.bg = new UIComponent ({
		id: 'trailer-frame-bg',
		target: T,
		css: {
			width: adParams.adWidth,
			height: 80,
			backgroundColor: adData.colors.grey
		},
		align: Align.BOTTOM
	})

	T.mainVideoPlayer = document.createElement('netflix-video');
	T.mainVideoPlayer.id = "main-video";
	T.mainVideoPlayer.setAttribute('width', 300)
	T.mainVideoPlayer.setAttribute('height', 200)
	T.mainVideoPlayer.setAttribute('color-1', adData.colors.red);
	T.mainVideoPlayer.setAttribute('color-2', adData.colors.white);
	T.mainVideoPlayer.setAttribute('close-color-1', adData.colors.red);
	T.mainVideoPlayer.setAttribute('close-color-2', adData.colors.white);
	T.mainVideoPlayer.setAttribute('data-dynamic-key', 'Trailer')
	T.mainVideoPlayer.setAttribute('controls', '');
	T.mainVideoPlayer.addEventListener('video-click', Control.handleTrailerFrameClick);
	T.appendChild(T.mainVideoPlayer);
	
	T.cta = document.createElement('netflix-cta')
	T.cta.setAttribute('data-dynamic-key', 'CTA')
	T.cta.setAttribute('arrow', '')
	T.cta.setAttribute('border', '')
	T.appendChild(T.cta)

	T.netflixLogo = document.createElement('netflix-brand-logo')
	T.appendChild(T.netflixLogo)
		
		


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
function MainBorder(){
	new UIBorder({
		target : View.main,
		size : 1,
		color : '#000000'
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
		Styles.setCss(View.main, {opacity: 1})

		View.ribbon.play()

	}

	this.playIntro = function(){
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

	
	this.showEndFrame = function() {
		console.log('Animation.showEndFrame()')
		
		View.intro.hide()
		View.endFrame.show()


	}

	
	this.hideTrailerFrame = function(){
		var fsElement = FullScreen.isFullScreen()
		var hasFullScreenVideo = (fsElement && fsElement.tagName === 'VIDEO')
		// iOS safari doesn't have fullscreen info under document
		var trailerVideo = Markup.get('<video>', View.trailerFrame.mainVideoPlayer)[0]

		// do nothing if video is in fullscreen mode
		if (hasFullScreenVideo || trailerVideo.webkitDisplayingFullscreen) {
			return
		}
		TweenLite.to( View.trailerFrame, 1, { y:-adParams.adHeight, ease:Expo.easeInOut })
		TweenLite.to( View.endFrame, 1, { y:0, ease:Expo.easeInOut })
		View.trailerFrame.mainVideoPlayer.pause()
		Animation.showEndFrame()
	}

	this.showTrailerFrame = function(){
		TweenLite.to( View.trailerFrame, 1, { y:0, ease:Expo.easeOut })
		TweenLite.to( View.endFrame, 1, { y:175, ease:Expo.easeOut })
		View.trailerFrame.mainVideoPlayer.play()
	}


}
