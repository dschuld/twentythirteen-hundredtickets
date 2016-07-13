
var didScroll;
var lastScrollTop = 0;
var delta = 75;
var deltaDown = 400;
var navbarHeight = $('.site-header').outerHeight();
var offset = 0;
var hidden = false;


$(window).scroll(function (event) {
    didScroll = true;

});

setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);


/*
 * Bei click auf home oder post menu:
 * - falls header up, main auch up
 * 
 * 
 * 
 * 
 * 
 * 
 */


function showMap() {
    if (!hidden) {
        return;
    }

    hidden = false;
    $('.site-header').removeClass('nav-up').addClass('nav-down');
    $('.show-map').removeClass('show-map').addClass('hide-map');
    $('.hide-map a').html('Hide Map');
    $('.site-main').css({
        'top': 0
    });

}


function hideMap() {
    if (hidden) {
        return;
    }

    hidden = true;

    $('.site-header').removeClass('nav-down').addClass('nav-up');

    offset = 500 - $(this).scrollTop();

    if (offset > 0) {
        $('.site-main').css({
            'top': 0 - offset
        });

    }


    $('.hide-map').removeClass('hide-map').addClass('show-map');
    $('.show-map a').html('Show Map');

}



(function ($) {

    $(document).on('click', '.hide-map a', function (event) {
        event.preventDefault();
        hideMap();
    });

    $(document).on('click', '.show-map a', function (event) {
        event.preventDefault();
        showMap();
    });

})(jQuery);

function hasScrolled() {
    var st = $(this).scrollTop();
    console.log(st);

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta) {
        return;
    }

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
        hideMap();
    } else {

        // Scroll Up
        if (st <= 500) {
            showMap();
        }
    }

    lastScrollTop = st;
}