requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'Twitter', 'ListView', 'ListPage'],
function (doc, Twitter, ListView, ListPage) {
    
    var twitter = new Twitter(localStorage);
    var factory = {newListView:function(x,y){return new ListView(x,y);}};
    var view = new ListPage('daveappendix', twitter, factory);
    view.view.page.appendTo('body');

});
