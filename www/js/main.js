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
            function onDeviceReady() { new BeerTap(true); }
            doc.addEventListener("deviceready", onDeviceReady, false);
        });
}
else
{
    requirejs(['lib/domReady!', 'BeerTap'],
        function (doc, BeerTap) {
            new BeerTap(false);
        });
}