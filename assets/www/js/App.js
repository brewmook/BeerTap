function App(viewDiv)
{
    this.model = new Model();
    this.view = new View(viewDiv)

    var app = this;

    this.view.itemRemoveClicked = function(item) { app.onItemRemoveClicked(item); };

    $.getJSON(twitter.timelineQuery("TheBatTaps"), function(data)
    {
	app.model.parseTweets(data);
	app.view.refresh(app.model.items);
    });
}

App.prototype.onItemRemoveClicked = function(item)
{
    this.model.remove(item);
    this.view.remove(item);
    twitter.tweet("OFF: " + item.name);
};
