requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'TwitterProxy', 'JQMListView', 'ListPage'],
function (doc, TwitterProxy, JQMListView, ListPage) {
    
    var twitter = new TwitterProxy("proxy/twitter_user_timeline_json.php");
    var factory = {newListView:function(x,y){return new JQMListView(x,y);}};
    var view = new ListPage('BeerTapDemo', twitter, factory);
    view.view.page.appendTo('body');
    $.mobile.changePage("#BeerTapDemo");

});
