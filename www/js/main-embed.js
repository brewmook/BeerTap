requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'BeerTapEmbed'],
function (doc, BeerTapEmbed)
{
    new BeerTapEmbed('body');
});
