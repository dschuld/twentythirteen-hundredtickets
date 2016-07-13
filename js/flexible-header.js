
var didScroll;
var lastScrollTop = 0;
var delta = 75;
var deltaDown = 400;
var navbarHeight = $('.site-header').outerHeight();


$(window).scroll(function(event){
didScroll = true;

});

setInterval(function() {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
}, 250);

function showMap() {
	$('.site-header').removeClass('nav-up').addClass('nav-down');
	$('.show-map').removeClass('show-map').addClass('hide-map');
	$('.hide-map a').html('Hide Map');
	//$('.site-main').removeClass('main-up').addClass('main-down');
	
}

function hideMap() {
	$('.site-header').removeClass('nav-down').addClass('nav-up');
	$('.hide-map').removeClass('hide-map').addClass('show-map');
	$('.show-map a').html('Show Map');
	//$('.site-main').removeClass('main-down').addClass('main-up');
	
}



(function($) {

	$(document).on( 'click', '.hide-map a', function( event ) {
		event.preventDefault();
		hideMap();
	});

	$(document).on( 'click', '.show-map a', function( event ) {
		event.preventDefault();
		showMap();
	});
	
})(jQuery);

function hasScrolled() {
	var st = $(this).scrollTop();

	// Make sure they scroll more than delta
	if(Math.abs(lastScrollTop - st) <= delta) {
		return;
	}

	// If they scrolled down and are past the navbar, add class .nav-up.
	// This is necessary so you never see what is "behind" the navbar.
	if (st > lastScrollTop && st > navbarHeight) {
		hideMap();
	} else {

		// Scroll Up
		if(st <= 500) {
			showMap();
		}
	}

	lastScrollTop = st;
}