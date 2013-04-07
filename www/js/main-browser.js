requirejs.config({
    baseUrl: 'js',
    paths: { lib: '../lib' }
});

requirejs(['lib/domReady!', 'BeerTap', 'Utility'],
function (doc, BeerTap, Utility) {
    var twitterProxyUrl = Utility.changeRelativePath(window.location.href, 'twitter');
    var twitterProxy = Utility.rewriteProxy(twitterProxyUrl);
    new BeerTap(twitterProxy);
});
