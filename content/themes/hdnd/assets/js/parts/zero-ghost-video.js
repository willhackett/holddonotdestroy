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