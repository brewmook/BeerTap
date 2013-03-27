requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'TwitterProxy', 'ListView', 'ListPage', 'Model'],
function (doc, TwitterProxy, ListView, ListPage, Model) {
    
    var twitter = new TwitterProxy("proxy/twitter_user_timeline_json.php");
    var model = new Model(twitter);
    var view = new ListView('BeerTapDemo');
    var page = new ListPage('BeerTapDemo', model, view);
    page.view.page.appendTo('body');
    page.model.load('BeerTapDemo');

});
