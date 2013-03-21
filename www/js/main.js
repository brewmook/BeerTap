requirejs.config({
    baseUrl: 'js',
});

//requirejs(['jquerymobile'],
//function(jqm)
//{
//    //jQuery, canvas and the app/sub module are all
//    //loaded and can be used here now.
//});

requirejs(['domReady!', 'BeerTap'],
function (doc, BeerTap) {
    
    var app = null;
    
    function onDeviceReady() { app = new BeerTap($("#main"), $("#settings")); }

    doc.addEventListener("deviceready", onDeviceReady, false);
});
