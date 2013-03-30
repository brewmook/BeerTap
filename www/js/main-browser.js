requirejs.config({
    baseUrl: 'js',
    paths: { lib: '../lib' }
});

requirejs(['lib/domReady!', 'BeerTap'],
function (doc, BeerTap) {
    new BeerTap();
});
