(function($) {

	// Using strict mode
	'use strict';

	$('.side-menu-1.ff-section').each(function(index){

		// Index

		$(this).addClass('side-menu-1--id--' + index);

		var this_section = '.side-menu-1--id--' + index + '.ff-section';
		var $this_section = $(this_section);

		function socialLinksFixed() {
			var windowHeight = $(window).height();
			var sideMenuInnerHeight = $this_section.find('.side-menu-inner').outerHeight();
			var socialLinksHeight = $this_section.find('.side-menu__social').outerHeight();
			if ( sideMenuInnerHeight + socialLinksHeight < windowHeight ) {
				$this_section.find('.side-menu__social').addClass('side-menu__social--fixed')
			} else 	{
				$this_section.find('.side-menu__social').removeClass('side-menu__social--fixed');
			}

		}

		socialLinksFixed();

		$(window).load(function() {
			socialLinksFixed();
		});

		$(window).resize(function() {
			socialLinksFixed();
		});

	});

})(jQuery);