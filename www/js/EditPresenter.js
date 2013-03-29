define(function() {

    function EditPresenter(id, model, view)
    {
        var presenter = this;
        view.onAddClicked(function(newText) { model.add(newText, true); });
        view.onChangeClicked(function(oldText, newText) { model.change(oldText, newText); });
        view.onRefreshClicked(function() { model.load(presenter.twitterScreenName); });
        view.onRemoveClicked(function(item) { model.remove(item.name); });

        model.onItemsLoaded(function(items) { view.refresh(items); });
        model.onItemRemoved(function(item) { view.remove(item); });

        this.id = id;
        this.view = view;
        this.model = model;
        this.twitterScreenName = '';
    }

    EditPresenter.prototype.show = function(title, twitterScreenName)
    {
        this.view.clear();
        this.view.setHeading(title);
        this.model.load(twitterScreenName);
        this.twitterScreenName = twitterScreenName;
    };

    return EditPresenter;

});
