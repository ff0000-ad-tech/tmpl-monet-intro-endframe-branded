import { ImageManager } from 'ad-control'


function AdData(){
	var self = this;
	
	// ==============================================================================================================
	// EXTRACT JSON DATA HERE

	/* DYNAMIC IMAGES
		Dynamically loaded images need to be in their own directory, like "dynamic_images/".

		Then, you need to add your dynamic image-paths to the load-queue, so that when
		the secondary preload happens, these assets will get loaded. For example:

		self.theImageName = ImageManager.addToLoad(adParams.imagesPath + 'sample.jpg');
	 */

	self.fonts = {
		primary: 'template_font'


	}

	self.colors = {
		white: '#F5F5F1',
		grey: '#221F1F',
		red: '#E50914',
		black: '#000000',

	}

	// Store svg markup for use in all UISvg instances, reduces duplicate code across builds.  See UISvg.
	self.svg = {
		circle_play_btn : '<svg id="play_btn_svg" viewBox="0 0 32 32">' 
					+ '<path class= "play_btn_svg_circle" d="M16,0A16,16,0,1,1,0,16,16,16,0,0,1,16,0Z" style="fill:#e50914; fill-rule:evenodd"/>' 
					+ '<path class= "play_btn_svg_arrow" d="M11,7l15,9L11,24Z" style="fill:#fff; fill-rule:evenodd"/>'
					+ '</svg>',

	}


}

export default AdData