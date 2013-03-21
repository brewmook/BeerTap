define(['Model'], function(Model) {

function ListPage(twitterScreenName, twitter, factory)
{
    var page = this;
    this.view = factory.newListView(twitterScreenName, function() { page.model.load(twitterScreenName); });
    this.model = new Model(twitter, {itemsLoaded: function() { page.view.refresh(page.model.items); }});
    this.id = twitterScreenName;
}

});
