requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'Twitter', 'ListView', 'ListPage', 'Model'],
function (doc, Twitter, ListView, ListPage, Model) {
    
    var twitter = new Twitter(localStorage);
    var factory = {newListView:function(x){return new ListView(x);}};
    var model = new Model(twitter);
    var view = new ListPage('daveappendix', model, factory);
    view.view.page.appendTo('body');

});
