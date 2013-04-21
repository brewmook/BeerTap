define(function() {

    function ListPresenter(id, model, view, changePage)
    {
        var presenter = this;
        this.view = view;
        this.model = model;
        this.id = id;
        this._userId = '';
        this._changePage = changePage;
        view.onRefreshClicked(function() { model.load(presenter._userId); });
        model.onItemsLoaded(function(items) { view.refresh(items); });
    }

    ListPresenter.prototype.show = function(title, userId)
    {
        this.view.clear();
        this.view.setHeading(title);
        this.model.load(userId);
        this._userId = userId;
        this._changePage("#"+this.id);
    };

    return ListPresenter;

});
