requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    }
});

requirejs(['lib/domReady!', 'Twitter', 'ListView', 'ListPage', 'Model'],
function (doc, Twitter, ListView, ListPage, Model) {
    
    var twitter = new Twitter(localStorage);
    var model = new Model(twitter);
    var view = new ListView('daveappendix');
    var page = new ListPage('daveappendix', model, view);
    page.view.page.appendTo('body');

});
