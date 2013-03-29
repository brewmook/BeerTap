define(['TapsModel', 'TwitterConfirmer'],
function(TapsModel, TwitterConfirmer) {

    function EditPage(id, twitter, view)
    {
        var model = new TapsModel(new TwitterConfirmer(twitter, view.page));

        view.onAddClicked(function(newText) { model.add(newText, true); });
        view.onChangeClicked(function(oldText, newText) { model.change(oldText, newText); });
        view.onRefreshClicked(function() { model.load(twitter.authorisedScreenName()); });
        view.onRemoveClicked(function(item) { model.remove(item.name); });

        model.onItemsLoaded(function(items) { view.refresh(items); });
        model.onItemRemoved(function(item) { view.remove(item); });

        this.id = id;
        this.view = view;
        this.model = model;
    }

    EditPage.prototype.show = function(title, twitterScreenName)
    {
        this.view.clear();
        this.view.setHeading(title);
        this.model.load(twitterScreenName);
    };

    return EditPage;

});
