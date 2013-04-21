define(function() {

    function EditPresenter(id, model, view)
    {
        var presenter = this;
        view.onAddClicked(function(newText) { model.add(newText, true); });
        view.onChangeClicked(function(oldText, newText) { model.change(oldText, newText); });
        view.onRefreshClicked(function() { model.load(presenter.userId); });
        view.onRemoveClicked(function(item) { model.remove(item.name); });

        model.on('itemsLoaded', function(items) { view.refresh(items); });
        model.on('itemRemoved', function(item) { view.remove(item); });

        this.id = id;
        this.view = view;
        this.model = model;
        this.userId = '';
    }

    EditPresenter.prototype.show = function(title, userId)
    {
        this.view.clear();
        this.view.setHeading(title);
        this.model.load(userId);
        this.userId = userId;
        $.mobile.changePage("#"+this.id);
    };

    return EditPresenter;

});
