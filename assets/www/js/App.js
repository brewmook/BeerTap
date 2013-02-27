function App(viewDiv, twitterScreenName)
{
    var app = this;

    this.view = new View(viewDiv);
    this.view.itemRemoveClicked = function(item) { app.onItemRemoveClicked(item); };

    this.model = new Model();
    this.model.itemsLoaded = function() { app.onItemsLoaded(); };
    this.model.load(twitterScreenName);
}

App.prototype.onItemsLoaded = function()
{
    this.view.refresh(this.model.items);
};

App.prototype.onItemRemoveClicked = function(item)
{
    this.model.remove(item);
    this.view.remove(item);
    twitter.tweet("OFF: " + item.name);
};
