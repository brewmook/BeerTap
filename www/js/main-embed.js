requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'TwitterProxy', 'ListView', 'ListPage', 'TapsModel'],
function (doc, TwitterProxy, ListView, ListPage, TapsModel) {
    
    var twitter = new TwitterProxy("proxy/twitter_user_timeline_json.php");
    var model = new TapsModel(twitter);
    var view = new ListView('BeerTapDemo');
    view.setHeading('@BeerTapDemo');
    var page = new ListPage('BeerTapDemo', model, view);
    page.view.page.appendTo('body');
    page.model.load('BeerTapDemo');

});
