define(function() {

function ListPage(twitterScreenName, model, view)
{
    var page = this;
    this.view = view;
    this.view.onRefreshClicked(function() { model.load(twitterScreenName); });
    this.model = model;
    this.model.onItemsLoaded(function(items) { page.view.refresh(items); });
    this.id = twitterScreenName;
}

return ListPage;

});
