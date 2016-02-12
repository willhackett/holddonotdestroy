(function($) {

	// Using strict mode
	'use strict';

	// Has JS

	$('body').removeClass('no-js');

	// Background Check

	var backgroundCheckImages = '.featured-video-1 img, .featured-slider-1 img, .featured-image-1 img, .portfolio-cat-1 img';

	window.backgroundCheckRefreshImages = function (){
		BackgroundCheck.set('images', backgroundCheckImages);
	};

	if ( 0 != $(backgroundCheckImages).size() ){
		BackgroundCheck.init({
			images: backgroundCheckImages,
			targets: '.background-check, .swiper-pagination',
			threshold: 70,
			windowEvents: true
		});
	}


})(jQuery);

