requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'oAuthConfig', 'Twitter', 'ListView', 'ListPage'],
function (doc, oAuthConfig, Twitter, ListView, ListPage) {
    
    var twitter = new Twitter(oAuthConfig, localStorage);
    var factory = {newListView:function(x,y){return new ListView(x,y);}};
    var view = new ListPage('daveappendix', twitter, factory);
    view.view.page.appendTo('body');

});
