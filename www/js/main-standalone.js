requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'Twitter', 'ListView', 'ListPage', 'TapsModel'],
function (doc, Twitter, ListView, ListPage, TapsModel) {
    
    var twitter = new Twitter(localStorage);
    var model = new TapsModel(twitter);
    var view = new ListView('daveappendix');
    view.setHeading('@daveappendix');
    var page = new ListPage('daveappendix', model, view);
    page.view.page.appendTo('body');

});
