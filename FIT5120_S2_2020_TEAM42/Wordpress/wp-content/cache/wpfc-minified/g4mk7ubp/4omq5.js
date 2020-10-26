// source --> https://www.ayemate.tk/wp-content/plugins/search-filter-elementor/assets/js/search-filter-elementor.js?ver=1.0.0 
(function ( $ ) {

	"use strict";
	
	$(function () {
		
		// re init layout after ajax request
		$(document).on("sf:ajaxfinish", ".searchandfilter", function( e, data ) {
			//elementorFrontend.init();
			//elementorFrontend.elementsHandler.runReadyTrigger('.elementor-widget-posts');
			if ( elementorFrontend ) {
				if ( elementorFrontend.elementsHandler ) {
					if ( elementorFrontend.elementsHandler.runReadyTrigger ) {
						elementorFrontend.elementsHandler.runReadyTrigger(data.targetSelector);
					}
				}
			}
		});

	});

	// load search forms in popups
	$( window ).on( 'elementor/frontend/init', function() {
		elementorFrontend.elements.$document.on( 'elementor/popup/show', ( e, id, document ) => {
			if ( $().searchAndFilter ) {
				
				var $sliders = $('.elementor-popup-modal .searchandfilter .meta-slider');
				if ( $sliders.length > 0 ) {
					$sliders.empty();
				}

				$('.elementor-popup-modal .searchandfilter').searchAndFilter();
				
			}
		} );
	});

}(jQuery));