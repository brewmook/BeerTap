requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'TwitterProxy', 'ListView', 'ListPage'],
function (doc, TwitterProxy, ListView, ListPage) {
    
    var twitter = new TwitterProxy("proxy/twitter_user_timeline_json.php");
    var factory = {newListView:function(x,y){return new ListView(x,y);}};
    var view = new ListPage('BeerTapDemo', twitter, factory);
    view.view.page.appendTo('body');
    view.model.load('BeerTapDemo');

});
