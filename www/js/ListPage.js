define(function() {

function ListPage(twitterScreenName, model, view)
{
    this.view = view;
    this.model = model;
    this.id = twitterScreenName;
    view.onRefreshClicked(function() { model.load(twitterScreenName); });
    model.onItemsLoaded(function(items) { view.refresh(items); });
}

return ListPage;

});
