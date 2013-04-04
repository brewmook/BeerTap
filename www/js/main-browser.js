requirejs.config({
    baseUrl: 'js',
    paths: { lib: '../lib' }
});

requirejs(['lib/domReady!', 'BeerTap'],
function (doc, BeerTap) {
    var match = /(.*:\/\/[^?#]+\/)/.exec(window.location.href);
    if (match)
    {
        var home = match[1];
        function proxy(uri)
        {
            var result = uri.toString();
            if (uri.host == "api.twitter.com")
            {
                var paths = {
                    "/1/statuses/user_timeline.json" :   "proxy/twitter_1_statuses_user_timeline.php",
                    "/1.1/statuses/user_timeline.json" : "proxy/twitter_1_1_statuses_user_timeline.php",
                    "/1.1/statuses/update.json" :        "proxy/twitter_1_1_statuses_update.php",
                    "/oauth/request_token" :             "proxy/twitter_oauth_request_token.php",
                    "/oauth/authorize" :                 "proxy/twitter_oauth_authorize.php",
                    "/oauth/access_token" :              "proxy/twitter_oauth_access_token.php"
                };
                result = [home, paths[uri.path], '?', uri.query].join('');
            }
            return result;
        }
        new BeerTap(proxy);
    }
});
