import '@netflixadseng/wc-netflix-brand-logo'
import '@netflixadseng/wc-netflix-cta'
import '@netflixadseng/wc-netflix-text'
import '@netflixadseng/wc-netflix-img'
import { Styles, Markup, Align, Effects } from 'ad-view'
import { ImageManager } from 'ad-control'
import '@size/images/keyart.jpg'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import '@netflixadseng/wc-netflix-flushed-ribbon'
import '@netflixadseng/wc-netflix-video'
import '@netflixadseng/wc-netflix-fonts'
import '@size/images/pedigree.png'
import { UIComponent, UIBorder, UIButton, UIImage, TextFormat, UITextField, UISvg } from 'ad-ui'
import '@size/images/tt.png'


export function Main() {
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
	Styles.setCss(T, { backgroundColor:'#000000' });


	return T
}

// ==============================================================================================================
export function Intro() {
	var T = new UIComponent({
		id: 'intro-container',
		target: View.main,
		css: {
			width: 'inherit',
			height: 'inherit'
		}
	})

// video
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

// brand logo
T.netflixLogo = document.createElement('netflix-brand-logo')
T.netflixLogo.setAttribute('width', 90)
T.appendChild(T.netflixLogo)

T.postMarkupStyling = function() {
	Styles.setCss(View.intro.netflixLogo, { opacity: 0 })
	Align.set(View.intro.netflixLogo, {
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
export function EndFrame() {
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

// ftm
T.ftm = document.createElement('netflix-text')
T.ftm.setAttribute('data-dynamic-key', 'FTM')
T.appendChild(T.ftm)

// tune-in
T.tunein = document.createElement('netflix-text')
T.tunein.setAttribute('data-dynamic-key', 'Tune_In')
T.appendChild(T.tunein)

// logo
T.netflixLogo = document.createElement('netflix-brand-logo')
T.netflixLogo.setAttribute('width', 90)
T.appendChild(T.netflixLogo)

// cta
T.cta = document.createElement('netflix-cta')
T.cta.setAttribute('data-dynamic-key', 'CTA')
T.cta.setAttribute('arrow', '')
T.cta.setAttribute('border', '')
T.cta.setAttribute('width', 90)
T.cta.setAttribute('height', 24)
T.appendChild(T.cta)

T.postMarkupStyling = function() {
	let T = View.endFrame

	// Ratings Bug
	if (adData.hasRatings) {
		T.ratingsBug = new UIImage({
			target: T,
			id: 'ratingsBug',
			source: adData.ratingsSrc,
			css: {
				width: 20,
				height: 20
			}
		})
		Align.set(T.ratingsBug, {
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

	// tune-in
	Styles.setCss(T.tunein, {
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

	// ftm
	Styles.setCss(T.ftm, {
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

	// logo
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

	// cta
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
export function NetflixRibbon() {
	var T = document.createElement('netflix-flushed-ribbon')
	T.setAttribute('width', adParams.adWidth)
	T.setAttribute('height', adParams.adHeight)
	T.style.position = 'absolute'
	View.main.appendChild(T)
	return T
}

export function MainBorder() {
	new UIBorder({
		target: View.main,
		size: 1,
		color: '#000000'
	})
}


