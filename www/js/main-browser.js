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
        function twitterProxy(uri)
        {
            if (uri.host == "api.twitter.com")
                return [home, 'twitter', uri.path, '?', uri.query].join('');
            return uri.toString();
        }
        new BeerTap(twitterProxy);
    }
});
