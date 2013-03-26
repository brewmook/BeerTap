requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'TwitterProxy', 'ListView', 'ListPage', 'Model'],
function (doc, TwitterProxy, ListView, ListPage, Model) {
    
    var twitter = new TwitterProxy("proxy/twitter_user_timeline_json.php");
    var factory = {newListView:function(x,y){return new ListView(x,y);}};
    var model = new Model(twitter);
    var view = new ListPage('BeerTapDemo', model, factory);
    view.view.page.appendTo('body');
    view.model.load('BeerTapDemo');

});
