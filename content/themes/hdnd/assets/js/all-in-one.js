// zero-ghost-video.js


(function($) {

	// Using strict mode
	'use strict';

	// http://stackoverflow.com/questions/18268233/get-youtube-video-id-from-link-with-javascript
	function youtube_parser(url){
		var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
		return (url.match(p)) ? RegExp.$1 : false ;
	}

	function vimeo_parser(url){
		var regExp = /https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;
		var match = url.match(regExp);
		if (match){
			return match[2];
		}else{
			return false;
		}
	}

	$('.blog-post-1.ff-section').each(function (index) {


		$(this).addClass('blog-post-1--id--' + index);

		var this_section = '.blog-post-1--id--' + index + '.ff-section';
		var $this_section = $(this_section);

		var $first_video_link = $this_section.find('.post-content > p:first > a');
		var first_video_link_value;
		var $previous_featured = $this_section.prev();

		var video_html = '';

		// Should I put there video?

		if( 0 == $previous_featured.size() ){
			return;
		}

		if( ! $previous_featured.hasClass('featured-area-1') ){
			return;
		}

		if( 0 == $first_video_link.size() ){
			return;
		}

		first_video_link_value = $first_video_link.attr('href');

		// Translate video URL to embeded URL

		if( vimeo_parser( first_video_link_value ) ){

			video_html = '';
			video_html += '<div class="featured-video__wrapper">';
			video_html += '<div class="embed-responsive embed-responsive-16by9">';
			video_html += '<iframe class="embed-responsive-item" src="';
			video_html += 'https://player.vimeo.com/video/' + vimeo_parser( first_video_link_value ) + '';
			video_html += '" width="1199" height="674" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>';
			video_html += '</iframe>';
			video_html += '</div>';
			video_html += '</div>';

			$previous_featured.prepend(video_html);

		}else if( youtube_parser( first_video_link_value ) ){

			video_html = '';
			video_html += '<div class="featured-video__wrapper">';
			video_html += '<div class="embed-responsive embed-responsive-16by9">';
			video_html += '<iframe class="embed-responsive-item" src="';
			video_html += 'https://www.youtube.com/embed/' + youtube_parser( first_video_link_value ) + '?rel=0&amp;controls=0&amp;showinfo=0';
			video_html += '" width="1199" height="674" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen>';
			video_html += '</iframe>';
			video_html += '</div>';
			video_html += '</div>';

			$previous_featured.prepend(video_html);

		} else{

			// Unknown video
			return;

		}

		$this_section.find('.post-content > p:first').remove();

		// Modify HTML to video section

		$previous_featured.removeClass('featured-area-1');
		$previous_featured.addClass('featured-video-1');

		$previous_featured.find('.featured-image-1 img').addClass('responsive-image-1 ff-block').unwrap();

		$previous_featured.prepend('<img class="black-bg" src="data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=">');

		$previous_featured.append('<a class="big-play-button background-check" href=""><span class="play-shape"></span></a>');

	});
})(jQuery);


// global.js


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




// blog-post-1.js



// Global variables for disqus
var disqus_shortname;
var disqus_identifier;
var disqus_title;
var disqus_url;


(function($) {

	// Using strict mode
	'use strict';

	disqus_shortname = $('body').attr('data-disqus_shortname');

	/*----------------------------------------------------------*/
	/* DISQUS COMMENT COUNT
	 /*----------------------------------------------------------*/

	if( disqus_shortname ) {
		// https://help.disqus.com/customer/portal/articles/565624-tightening-your-disqus-integration
		(function () {
			var s = document.createElement('script'); s.async = true;
			s.type = 'text/javascript';
			s.src = '//' + disqus_shortname + '.disqus.com/count.js';
			(document.getElementsByTagName('HEAD')[0] || document.getElementsByTagName('BODY')[0]).appendChild(s);
		}());
	}

	/**********************************************************************************************************************/
	/* BLOG POST COLLAPSING / EXPANDING
	 /**********************************************************************************************************************/
	var toggleAnimationSpeed = 600;
	var closeModalCoord = 0;

	function toggleAnimationOfElements($element, animationSpeed ){
		$element.animate({
			height: 'toggle',
			opacity: 'toggle',
			margin: 'toggle',
			padding: 'toggle'
		}, animationSpeed, 'swing', function(){
			$('.blog-post-1.ff-section .post-expand-toggle').removeClass('animation-active');
		});
	}

	function toggleSection( $section, animationSpeed ) {
		var $expander = $section.find('.post-expander');
		var $collapser = $section.find('.post-collapser');

		toggleAnimationOfElements( $expander, animationSpeed );
		toggleAnimationOfElements( $collapser, animationSpeed );
	}

	function expandBlogPostSection( $section, speed ) {
		if( $section.hasClass('blog-post-1--expanded') ) {
			return false;
		}

		$section.addClass('blog-post-1--expanded');

		toggleSection( $section, speed );
	}

	function collapseBlogPostSection( $section, speed ) {
		if( !$section.hasClass('blog-post-1--expanded') ) {
			return false;
		}

		$section.removeClass('blog-post-1--expanded');

		toggleSection( $section, speed );
	}

	var $hideCommentsModal = $('.comments-modal-1.ff-block .hide-comments');

	$hideCommentsModal.click(function(e){
		e.preventDefault();

		if ( $('.breakpoint').width() <= 2 ){
			$('html, body').css('height', '').css('overflow', '');
			$('.master-wrapper').css('opacity','');
			$('html, body').animate({ scrollTop: closeModalCoord }, 'slow');
		}

		if ( $('#commentform textarea#comment').val() ){
			if (!confirm( $('.closing-unfinished-comment').html() ) == true) {
				return false;
			}
		}

		$('.comments-modal-1').fadeOut('300');
		setTimeout( function(){
			$('html').removeClass('scroll-lock');
			$('.comments-modal-1 .comments__title').remove();
		}, 300 + 50 );
		$('.master-wrapper').css('filter', '').css('-webkit-filter', '');
	});


	/**********************************************************************************************************************/
	/* EACH SECTION
	 /**********************************************************************************************************************/

	$('.blog-post-1.ff-section').each(function(index){

		/*----------------------------------------------------------*/
		/* VARIABLES
		 /*----------------------------------------------------------*/
		var $this_section = $(this);
		var $postExpandToggle = $this_section.find('.post-expand-toggle');
		var $postExpander = $this_section.find('.post-expander');
		var $postCollapser = $this_section.find('.post-collapser');

		/*----------------------------------------------------------*/
		/* EXPAND / COLLAPSE AFTER CLICK
		 /*----------------------------------------------------------*/


		$postExpandToggle.click(function( e ){

			if( $postExpandToggle.hasClass('animation-active') ){
				return false;
			}

			$postExpandToggle.addClass('animation-active');

			e.preventDefault();

			// expand only current section
			if( $this_section.hasClass('blog-post-1--expanded') ) {
				collapseBlogPostSection( $this_section, toggleAnimationSpeed );
				setCookie( 'ff-' + $this_section.attr('id'), '' );
			} else {
				expandBlogPostSection( $this_section, toggleAnimationSpeed );
				setCookie( 'ff-' +$this_section.attr('id'), 'ff-' +$this_section.attr('id') );
			}

			/*----------------------------------------------------------*/
			/* EXPAND / COLLAPSE AFTER CLICK
			 /*----------------------------------------------------------*/

			if( ! $('body').hasClass('posts-opened') ) {
				// Scroll To Nice Position
				var thisSectionOffset = $this_section.offset().top;
				var headerHeight = $('.header-1.ff-section').outerHeight();
				var hasFeaturedArea = $this_section.prev().is('.featured-area-1.ff-section, .featured-slider-1.ff-section, .featured-video-1.ff-section');
				var featuredAreaHeight = 0;
				var scrollTo = 0;
				var mobileHeaderHeight;

				if (hasFeaturedArea == true) {
					if ($('.breakpoint').width() == 1) {
						if ($this_section.prev().outerHeight() < $(window).height() * 0.4) {
							featuredAreaHeight = $this_section.prev().outerHeight();
						}
					} else if ($('.breakpoint').width() == 2) {
						if ($this_section.prev().outerHeight() < $(window).height() * 0.7) {
							featuredAreaHeight = $this_section.prev().outerHeight();
						}
					}
				}

				if ($('.breakpoint').width() >= 3) {
					scrollTo = thisSectionOffset - headerHeight + 1;
				} else if ($('.breakpoint').width() == 2) {
					scrollTo = thisSectionOffset - featuredAreaHeight + 1;
				} else {
					mobileHeaderHeight = $('.header-1.ff-section').outerHeight();
					scrollTo = thisSectionOffset - mobileHeaderHeight - featuredAreaHeight;
				}

				if (0 > scrollTo) {
					scrollTo = 1;
				}

				$("html, body").animate({scrollTop: scrollTo}, 'slow');

				return false;
			}
		});

		/*----------------------------------------------------------*/
		/* EXPAND THIS SECTION AT SINGULAR VIEW
		 /*----------------------------------------------------------*/
		if ( $('body').hasClass('posts-opened')){
			$postExpander.slideDown(0);
			$postCollapser.slideUp(0);
		} else {
			$postExpander.slideUp(0);
			$postCollapser.slideDown(0);
		}

		/*----------------------------------------------------------*/
		/* DISQUS COMMENTS
		 /*----------------------------------------------------------*/

		// Add Comments Popup Link to post header meta

		var $showCommentsModal = $this_section.find('a.comments-popup-link');

		if( disqus_shortname ) {
			$showCommentsModal.click(function (e) {

				if ($('.breakpoint').width() <= 2) {
					closeModalCoord = $(window).scrollTop();
					$('html, body').css('height', '100%').css('overflow', 'hidden');
					$('.master-wrapper').css('opacity', '0');
				}

				var data = {};
				data.postId = $(this).data('post-id');

				if ($('.breakpoint').width() >= 3) {
					$('.master-wrapper').css('filter', 'blur(10px)').css('-webkit-filter', 'blur(10px)');
				}

				if ($this_section.prev().is('.featured-area-1')) {
					var featuredImagePathForCommentsModal = $this_section.prev().find('img').attr('src');
					$('.comments-modal-1').find('.comments-modal-1__header__bg-image').css('background-image', 'url("' + featuredImagePathForCommentsModal + '")');
				}

				if ($this_section.prev().is('.featured-video-1')) {
					var featuredImagePathForCommentsModal = $this_section.prev().find('img.responsive-image-1').attr('src');
					$('.comments-modal-1').find('.comments-modal-1__header__bg-image').css('background-image', 'url("' + featuredImagePathForCommentsModal + '")');
				}


				var commentsModalArticleName = $this_section.find('.post-title a').text();
				$('.comments-modal-1 .insert-article-title').html(commentsModalArticleName);


				// Disqus
				$('.comments-modal-1').fadeIn('300').find('.insert-comments').html('<div id="disqus_thread"></div>');

				// Global variables
				var domain_and_port = window.location.href.split("/");
				domain_and_port = domain_and_port[0] + "//" + domain_and_port[2];

				disqus_identifier = $(this).attr('data-disqus-identifier');
				disqus_title = $this_section.find('.post-title a').html().trim();
				disqus_url = $(this).attr('href').split('#')[0];

				/* * * DON'T EDIT BELOW THIS LINE * * */
				(function () {
					var dsq = document.createElement('script');
					dsq.type = 'text/javascript';
					dsq.async = true;
					dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
					(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
				})();


				$('html').addClass('scroll-lock');
				BackgroundCheck.refresh();
				$('.comments-modal-1 .insert-comments-title').html('<h3 class="comments__title">' + $(this).html() + '</h3>');

				return false;

			});
		}


		/*----------------------------------------------------------*/
		/* POST SHARE
		 /*----------------------------------------------------------*/

		var $postShareOpenPopup = $this_section.find('.post-share__open-popup');
		var $postSharePopup = $this_section.find('.post-share__popup');
		var postSharePopupOutOfContext = '.post-share__out-of-context';
		var postShareClosePopupOutOfContext = '.post-share__out-of-context .post-share__close-popup';

		$postShareOpenPopup.on('click', function(e){

			e.preventDefault();

			$postSharePopup.appendTo('body').addClass('post-share__out-of-context');
			var $postSharePopupOutOfContext = $(postSharePopupOutOfContext);

			if ( $('.breakpoint').width() >= 3 ){
				$('.master-wrapper').css('filter', 'blur(10px)').css('-webkit-filter', 'blur(10px)');
			}

			$('html').addClass('scroll-lock');

			setTimeout( function(){
				$postSharePopupOutOfContext.fadeIn('300');
			}, 300 );


		});

		$(document).on('click', postShareClosePopupOutOfContext, function(e){

			e.preventDefault();

			$postSharePopup.appendTo('body').addClass('post-share__out-of-context');
			var $postSharePopupOutOfContext = $(postSharePopupOutOfContext);
			$postSharePopupOutOfContext.fadeOut('300');

			$('.master-wrapper').css('filter', '').css('-webkit-filter', '');

			setTimeout( function(){
				$('html').removeClass('scroll-lock');
			}, 300 );

			setTimeout( function(){
				$postSharePopupOutOfContext.remove();
			}, 600 );

		});


////////////////////////////////////////////////////////////////////////////////////////////////////////////

		function setCookie(c_name,value){
			var expires = new Date();
			var time = expires.getTime();
			time += 60 * 24 * 3600 * 1000;
			expires.setTime(time);

			if( false === value ){
				expires = 'Thu, 01 Jan 1970 00:00:01 GMT';
				document.cookie = c_name + '=; path=/; expires='+expires+';';
			}else{
				document.cookie = c_name + "=" + escape(value) + '; path=/; expires='+expires+';';
			}
		}

		function getCookie(c_name){
			var i,x,y,ARRcookies=document.cookie.split(";");
			for (i=0;i<ARRcookies.length;i++){
				x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
				y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
				x=x.replace(/^\s+|\s+$/g,"");
				if (x==c_name) {
					if( 'false' == y){
						return false;
					}
					return unescape(y);
				}
			}
			return false;
		}

		if( $('body').hasClass('posts-cookie-opening') ){
			if( getCookie( 'ff-' + $this_section.attr('id') ) ) {
				expandBlogPostSection( $this_section, 0 );
			} else {
				collapseBlogPostSection( $this_section, 0 );
			}
		}
	});

})(jQuery);





// featured-video-1.js


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


// header-1.js


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
		});


	});

})(jQuery);


// footer-1.js


(function($) {

	// Using strict mode
	'use strict';

	$('.footer-1.ff-section').each(function(index){

		// Index

		$(this).addClass('footer-1--id--' + index);

		var this_section = '.footer-1--id--' + index + '.ff-section';
		var $this_section = $(this_section);

		// Do

		var $widget_recent_entries = $this_section.find('.widget_recent_entries_ajax');

		if( 0 < $widget_recent_entries.size() ){
			$widget_recent_entries.html('<ul></ul>');

			$(window).load(function(){
				$.get('/', function( data ) {
					var $home = $( ( data ) );
					var $recent = $home.find('.post-title a');
					var $widget_recent_entries_ul = $this_section.find('.widget_recent_entries_ajax ul');

					$recent.each(function(){
						var $a = $(this);
						$widget_recent_entries_ul.append( '<li><a href="' + $a.attr('href') + '">' + $a.html() + '</a>' );
					});
				});
			});
		}

	});

})(jQuery);


// loader-1.js



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


// side-menu-1.js



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