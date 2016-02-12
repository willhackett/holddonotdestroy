(function($) {

	// Using strict mode
	'use strict';

	// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
	function shuffle(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	$('.loader-1.ff-block').each(function(index){

		// NOTE: loader-1 needs to be first in body

		$(this).addClass('loader-1--id--' + index);

		var this_block = '.loader-1--id--' + index + '.ff-block';
		var $this_block = $(this_block);


		// Ghost START

		var $loaderLogo = $this_block.find('img.logo-desktop');

		$loaderLogo.load(function() {
			// Get on screen image
			var originalImageLight = $loaderLogo;
			// Create new offscreen image to test
			var propImageLight = new Image();
			propImageLight.src = originalImageLight.attr("src");
			// Get accurate measurements from that.
			var loaderLogoWidth = propImageLight.width;
			var loaderLogoHeight = propImageLight.height;
			// Print size
			$loaderLogo.attr('width', loaderLogoWidth/2).attr('height', loaderLogoHeight/2);
		});

		// Ghost END


		// Animated Logo Backgrounds

		if( $this_block.hasClass('loader-type-2') ){

			var $animatedLogo = $this_block.find('.logo-animated__wrapper');
			var imageArray = JSON.parse( $animatedLogo.attr('data-images') );

			shuffle(imageArray);

			var FADING_LENGTH = 0; //ms
			var FADING_DELAY = 150; //ms

			var imageIndex = 0;

			var animateLogoFunction = function(){
				imageIndex ++;
				if ( imageIndex >= imageArray.length ){
					imageIndex = 0;
				}

				var $dummyImage = $('<img />', {
					class: 'dummy-image',
					src: imageArray[imageIndex]
				});
				$dummyImage.appendTo($this_block.find('.logo-animated__wrapper')).hide().fadeIn(FADING_LENGTH, function(){
					$dummyImage.siblings('.dummy-image').remove();
				});
			};

			var imageInterval = window.setInterval( animateLogoFunction, FADING_DELAY);
		}

		/* Enter phase */

		$(window).load(function(){
			window.clearInterval(imageInterval); // Animated Logo Backgrounds
			$this_block.fadeOut('250');
			if( ! $('body').hasClass('is-mobile') ){
				BackgroundCheck.refresh();
			}
		});

		/* Exit phase */

		$(window).bind('beforeunload', function(){
			$this_block.css('display', 'block').css('opacity', '0').animate({opacity: 1}, 250);
			window.setInterval( animateLogoFunction, FADING_DELAY);
		});

	});

})(jQuery);