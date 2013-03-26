define(['Model'], function(Model) {

function ListPage(twitterScreenName, twitter, factory)
{
    var page = this;
    this.view = factory.newListView(twitterScreenName, function() { page.model.load(twitterScreenName); });
    this.model = new Model(twitter);
    this.model.onItemsLoaded(function(items) { page.view.refresh(items); });
    this.id = twitterScreenName;
}

return ListPage;

});
