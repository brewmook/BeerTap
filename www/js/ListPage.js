define(function() {

function ListPage(twitterScreenName, model, factory)
{
    var page = this;
    this.view = factory.newListView(twitterScreenName);
    this.view.onRefreshClicked(function() { model.load(twitterScreenName); });
    this.model = model;
    this.model.onItemsLoaded(function(items) { page.view.refresh(items); });
    this.id = twitterScreenName;
}

return ListPage;

});
