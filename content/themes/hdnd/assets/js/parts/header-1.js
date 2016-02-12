(function($) {

	// Using strict mode
	'use strict';

	$('.header-1.ff-section').each(function(index){

		// Index

		$(this).addClass('header-1--id--' + index);

		var this_section = '.header-1--id--' + index + '.ff-section';
		var $this_section = $(this_section);

		$this_section.find('.logo').mouseenter( function(){ BackgroundCheck.refresh(); } ).mouseleave( function(){ BackgroundCheck.refresh(); } );
		$this_section.find('.menu-button').mouseenter( function(){ BackgroundCheck.refresh(); } ).mouseleave( function(){ BackgroundCheck.refresh(); } );

		// Header Vertical Centering

		function headerVerticalCentering() {
			var $logoHolder = $this_section.find('.logo-holder');
			var $menuButtonHolder = $this_section.find('.menu-holder');
			var $logo = $this_section.find('.logo');
			var $menuButton = $this_section.find('.menu-button');
			var logoHeight = $logo.outerHeight(true);
			var menuHeight = $menuButton.outerHeight(true);
			$menuButtonHolder.css('height', '');
			$logoHolder.css('height', '');
			if ( logoHeight > menuHeight ){
				$menuButtonHolder.css('height', logoHeight);
			} else {
				$logoHolder.css('height', menuHeight);
			}
		}

		// Side Menu

		var $menuItem = $('.side-menu .navigation > li');
		var $socialItem = $('.side-menu .side-menu__social li');
		var $menuButton = $this_section.find('.menu-button');
		var $logo = $('.side-menu .logo-wrapper');
		var $html = $('html');
		var $body = $('body');
		var $contentWrapperOverlay = $('.content-wrapper__overlay');

		$menuButton.on('click', function(e){

			e.preventDefault();

			if ( $body.hasClass('side-menu-closed') ){
				$body.removeClass('side-menu-closed');
				$body.addClass('side-menu-opened');
				$contentWrapperOverlay.fadeIn();

			} else 	{
				$body.removeClass('side-menu-opened');
				$body.addClass('side-menu-closed');
				$contentWrapperOverlay.fadeOut();
			}
			setTimeout(function() {
                if( ! $('body').hasClass('is-mobile') ){
                    BackgroundCheck.refresh();
                }
			}, 300);
			return false;
		});

		$contentWrapperOverlay.on('click', function(e){
			e.preventDefault();
			$body.removeClass('side-menu-opened');
			$body.addClass('side-menu-closed');
			$contentWrapperOverlay.fadeOut();
			setTimeout(function() {
				BackgroundCheck.refresh();
			}, 300);
		});
		
		function mobileCollapse(){
			var headerHeight = $this_section.outerHeight();
			if ( $('.breakpoint').width() <= 1 ){
				$('header.header').css('height', headerHeight);
			} else 	{
				$('header.header').css('height', '');				
			}
		}

		// FUNCTION CALLS

		headerVerticalCentering();
		mobileCollapse();

		// hideContentWrapperOverlay();

		$(window).load(function () {

			headerVerticalCentering();
			mobileCollapse();
		
			// hideContentWrapperOverlay();
		});

		$(window).resize(function(){

			headerVerticalCentering();
			mobileCollapse();
		
			// hideContentWrapperOverlay();
		});


	});

})(jQuery);