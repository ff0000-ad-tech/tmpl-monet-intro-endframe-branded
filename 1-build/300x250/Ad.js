import { Core } from 'ad-control'
import { Preflight } from '@common/js/Preflight.js'
import { EndFrame, Main, Intro, NetflixRibbon, MainBorder } from '@common/js/Build.js'
import { Animation } from '@common/js/Animation.js'
import { Control } from '@common/js/Control.js'
import { Device } from 'ad-external'


export class Ad {
	// called from index.html onImpression()
	static launch(fbaContent) {
		console.log('Ad.launch()')
		Core.init(fbaContent)
			.then(() => Preflight.init())
			.then(() => Core.loadDynamic())
			.then(() => Ad.prepare())
			.catch(err => {
				throw err
			})
	}

	static prepare() {
		console.log('Ad.prepare()')
		Control.preMarkup()


		View.main = new Main()
if (Device.type === 'desktop') View.intro = new Intro({ target: View.main })
View.endFrame = new EndFrame({ target: View.main })

		View.ribbon = new NetflixRibbon()
View.mainBorder = new MainBorder()






	}

static initMonet(element) {
	console.log('Ad.initMonet()')
	Control.handleMonetLoadComplete(element)
}


}
window.Ad = Ad
