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