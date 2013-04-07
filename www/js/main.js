requirejs.config({
    baseUrl: 'js',
    paths: {
        root: '..',
        lib: '../lib'
    }
});

if (/^file/.test(window.location.href))
{
    requirejs(['root/phonegap', 'lib/domReady!', 'BeerTap'],
        function (phonegap, doc, BeerTap) {
            var app = null;
            function onDeviceReady() { app = new BeerTap(); }
            doc.addEventListener("deviceready", onDeviceReady, false);
        });
}
else
{
    requirejs(['lib/domReady!', 'BeerTap', 'Utility'],
        function (doc, BeerTap, Utility) {
            var twitterProxyUrl = Utility.changeRelativePath(window.location.href, 'twitter');
            var twitterProxy = Utility.rewriteProxy(twitterProxyUrl);
            new BeerTap(twitterProxy);
        });
}