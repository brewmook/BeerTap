requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'BeerTap'],
function (doc, BeerTap) {
    
    var app = null;
    
    function onDeviceReady() { app = new BeerTap($("#main"), $("#settings")); }

    doc.addEventListener("deviceready", onDeviceReady, false);
});
