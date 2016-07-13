function getLastSegmentFromLink(link) {
	
	var targetHref = link.href;
	
		
	while(targetHref.lastIndexOf('/') === targetHref.length - 1) {
		
		targetHref = targetHref.substring(0, targetHref.length - 1);
	}		
	
	if (targetHref.indexOf('/') == -1) {
		return targetHref;
	}
	
	return targetHref.slice(targetHref.lastIndexOf('/') + 1);	
		
}




(function($) {
	
	var sendAjaxRequest = function(requestData) {
		
				
		$.ajax({
			url: ajaxs11.ajaxurl,
			type: 'get',
			data: requestData,
			beforeSend: function() {
				$('#main').find( 'article,nav' ).remove();
				$(document).scrollTop();
				
				$('#main').append( '<div style="display: block; width: 10%; margin: auto;" id="loader"><img src="https://drive.google.com/uc?export=download&amp;id=0B48vYXs63P2lYWhLNm42UFdISlU"></img></div>' );
			},
			success: function( result ) {
				$('#main #loader').remove();
				$('#main').append( result );
				$(document).scrollTop();
				var stateObj = { post: requestData.post_slug};
				history.pushState(stateObj, "", requestData.post_slug);
			}
		});
		
	};
	
	$(document).on( 'click', '.home-menu a', function( event ) {
		
		event.preventDefault();
		var targetHref = getLastSegmentFromLink(event.target);
		alert(event.target);
		$('#content').load(event.target + ' #content');
		
		//sendAjaxRequest({
		//		action: 'ajaxLoadHome',
		//		post_slug: '/#'
		//});
		
	});

	// entry-title is the class of the article header divs, needs to be adapted according to script used
	// iw-content is the class of the info window div on the map, used for catching then a link from map to blog post is clicked
	$(document).on( 'click', '.entry-title a', function( event ) {
		event.preventDefault();
		var targetHref = getLastSegmentFromLink(event.target);
		sendAjaxRequest({
				action: 'ajaxLoadPost',
				post_slug: targetHref
		});

	});
	
	$(document).on( 'click', '.more-link', function( event ) {
		event.preventDefault();
		var targetHref = getLastSegmentFromLink(event.target);
		sendAjaxRequest({
				action: 'ajaxLoadPost',
				post_slug: targetHref
		});

	});
	
	$(document).on( 'click', '.nav-links a', function( event ) {
		event.preventDefault();
		var pageNumber = getLastSegmentFromLink( event.target );
		sendAjaxRequest({
				action: 'ajaxPagination',
				page: pageNumber,
				query_vars: ajaxs11.query_vars
		});
})
	
	
	
})(jQuery);