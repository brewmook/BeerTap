define(function() {

function ListPage(twitterScreenName, model, view)
{
    this.view = view;
    this.model = model;
    this.id = twitterScreenName;
    view.onRefreshClicked(function() { model.load(twitterScreenName); });
    model.onItemsLoaded(function(items) { view.refresh(items); });
}

ListPage.prototype.show = function(title, twitterScreenName)
{
    this.view.clear();
    this.view.setHeading(title);
    this.model.load(twitterScreenName);
};

return ListPage;

});
