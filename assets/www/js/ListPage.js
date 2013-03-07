function ListPage(twitterScreenName, twitter)
{
    var page = this;

    this.view = new ListView(twitterScreenName, function() { page.model.load(twitterScreenName); });

    this.model = new Model(twitter);
    this.model.itemsLoaded = function() { page.view.refresh(page.model.items); };
  
    this.id = twitterScreenName;
}
