define(['Twitter', 'ListView', 'ListPresenter', 'TapsModel', 'Utility'],
function (Twitter, ListView, ListPresenter, TapsModel, Utility) {

    function BeerTapEmbed(parent)
    {
        var twitterScreenName = 'BeerTapDemo';

        var screenNameMatch = /\btwitterScreenName=([^&]+)/.exec(window.location.search);
        if (screenNameMatch) twitterScreenName = screenNameMatch[1];

        var twitterProxyUrl = Utility.changeRelativePath(window.location.href, 'twitter');
        var twitterProxy = Utility.rewriteProxy(twitterProxyUrl);
        var twitter = new Twitter({}, twitterProxy);
        var model = new TapsModel(twitter);
        var view = new ListView(twitterScreenName);
        var presenter = new ListPresenter(twitterScreenName, model, view, function(){});
        view.page.appendTo(parent);

        readDisplayOptions(view);

        presenter.show('@'+twitterScreenName, twitterScreenName);
    }

    function readDisplayOptions(view)
    {
        var body = $('html,body');
        var header = $('.header');
        var query = window.location.search.substring(1);
        query = query.split('&');
        query.forEach(function(argument) {
            var pair = argument.split('=');
            switch(pair[0].toLowerCase())
            {
            case "hiderefresh":
                view.hideRefreshButton();
                break;
            case "hidedates":
                view.hideDates();
                break;
            case "background":
                if (pair.length == 2)
                    body.css('background', decodeURIComponent(pair[1]));
                break;
            case "color":
                if (pair.length == 2)
                    body.css('color', decodeURIComponent(pair[1]));
                break;
            case "headerbackground":
                if (pair.length == 2)
                    header.css('background', decodeURIComponent(pair[1]));
                break;
            case "headercolor":
                if (pair.length == 2)
                    header.css('color', decodeURIComponent(pair[1]));
                break;
            case "css":
                if (pair.length == 2)
                {
                    $("#defaultstyle").remove();
                    $("<link/>", {
                        rel: "stylesheet",
                        type: "text/css",
                        href: decodeURIComponent(pair[1])
                    }).appendTo("head");
                }
                break;
            }
        });
    }

    return BeerTapEmbed;

});
