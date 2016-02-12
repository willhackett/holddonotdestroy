(function($) {

	// Using strict mode
	'use strict';

	$('.featured-video-1.ff-section').each(function(index){

		// Index

		$(this).addClass('featured-video-1--id--' + index);

		var this_section = '.featured-video-1--id--' + index + '.ff-section';
		var $this_section = $(this_section);

		// Selectors

		var $bigPlayButton = $this_section.find('.big-play-button');
		var $videoFrame = $this_section.find('iframe');

		// Functions

		function scrollToNicePosition(){
			var thisSectionOffset = $this_section.offset().top + 1;
			var mobileHeaderHeight;

			if ( $('.breakpoint').width() <= 2 ){
				mobileHeaderHeight = $('.header-1.ff-section').outerHeight();
				$("html, body").animate({ scrollTop: thisSectionOffset - mobileHeaderHeight }, 600); // +1

			} else {

				$("html, body").animate({ scrollTop: thisSectionOffset + 1}, 600); // +1

			}
		}

		$bigPlayButton.on('click', function(e){

			e.preventDefault();

			// Vars

			var videoHeight = $this_section.find('iframe').outerHeight();


			// Add autoplay

			var videoSrcAutoplay = $videoFrame.attr('src');
			if( -1 == videoSrcAutoplay.indexOf("?") ){
				videoSrcAutoplay = videoSrcAutoplay + '?autoplay=1&iv_load_policy=3&showinfo=0';
			}else{
				videoSrcAutoplay = videoSrcAutoplay + '&autoplay=1&iv_load_policy=3&showinfo=0';
			}
			$videoFrame.attr('src', videoSrcAutoplay);

			// Scroll To Nice Position

			scrollToNicePosition();

			// Switcheroo IMG/VIDEO

			setTimeout( function(){
				$this_section.find('.responsive-image-1.ff-block').css('-webkit-transform', 'scale(1.2)').css('transform', 'scale(1.2)').fadeOut(600);
				$this_section.find('.big-play-button').css('opacity','0').css('-webkit-transition', 'all 200ms ease-out').css('-moz-transition', 'all 200ms ease-out').css('transition', 'all 200ms ease-out');
				$videoFrame.hide();
				$this_section.animate({ height: videoHeight}, 600);
                BackgroundCheck.refresh();
			}, 10 );

			setTimeout( function(){
				$this_section.find('.big-play-button').remove();
			}, 410);

			// Allow video to be naturally responsive when resizing browser window

			setTimeout( function(){
				$videoFrame.fadeIn(600);
				$this_section.css('height','');
				$this_section.find('.featured-video__wrapper').css('position','static');
                BackgroundCheck.refresh();
			}, 600+100 );

		});

	});

})(jQuery);