function getLastSegmentFromLink(link) {

    var targetHref = link.href;


    while (targetHref.lastIndexOf('/') === targetHref.length - 1) {

        targetHref = targetHref.substring(0, targetHref.length - 1);
    }

    if (targetHref.indexOf('/') == -1) {
        return targetHref;
    }

    return targetHref.slice(targetHref.lastIndexOf('/') + 1);

}

function stripDomainFromLink(link) {
    var targetHref = link.href.replace('https://hundredtickets.net', '');
    targetHref = targetHref.replace('http://hundredtickets.net', '');

    return targetHref.replace('hundredtickets.net', '');

}



(function ($) {

    var scrollToTop = function () {
        $("html, body").animate({scrollTop: 5}, "slow");

    };

    var sendAjaxRequest = function (requestData) {


        $('#main').find('article,nav').remove();
        $(document).scrollTop();

        $('#main').append('<div style="display: block; width: 10%; margin: auto; padding: 30px;" id="loader"><img src="https://drive.google.com/uc?export=download&amp;id=0B48vYXs63P2lYWhLNm42UFdISlU"></img></div>');
        $('#content').load(requestData.url + ' #content', function (data) {
            $('#main #loader').remove();
        });


        var stateObj = {post: requestData.post_slug};
        history.pushState(stateObj, "", requestData.post_slug);

    };

    $(document).on('click', '.home-menu a', function (event) {

        event.preventDefault();

        scrollToTop();

        sendAjaxRequest({
            post_slug: '/index.php',
            url: event.target
        });

    });

    // entry-title is the class of the article header divs, needs to be adapted according to script used
    // iw-content is the class of the info window div on the map, used for catching then a link from map to blog post is clicked
    $(document).on('click', '.entry-title a, .more-link, .menu-item-object-category', function (event) {
        event.preventDefault();
        scrollToTop();
        hideMap();
        var targetHref = stripDomainFromLink(event.target);
        sendAjaxRequest({
            post_slug: targetHref,
            url: event.target
        });


    });

    $(document).on('click', '.nav-links a, .widget_recent_entries  a, .widget_archive  a', function (event) {

        event.preventDefault();

        scrollToTop();

        var pageNumber = getLastSegmentFromLink(event.target);
        sendAjaxRequest({
            url: event.target
        });
    });

    $(document).on('click', '.prevent', function (event) {

        event.preventDefault();

    });


})(jQuery);
