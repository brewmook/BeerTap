function EditPage(twitterScreenName, twitter)
{
    var app = this;

    this.newTextDialog = new TextInputDialog("newTextDialog", "New text", "Enter new text:");

    this.view = new EditView(twitterScreenName, this.newTextDialog);
    this.view.addClicked = function() { app.onViewAddClicked(); };
    this.view.itemRemoveClicked = function(item) { app.onViewItemRemoveClicked(item); };
    this.view.itemChangeClicked = function(item) { app.onViewItemChangeClicked(item); };

    this.model = new Model(twitter);
    this.model.itemsLoaded = function() { app.onModelItemsLoaded(); };
    this.model.itemRemoved = function(item) { app.onModelItemRemoved(item); };
    this.model.load(twitterScreenName);
  
    this.id = twitterScreenName;
}

EditPage.prototype.onViewAddClicked = function()
{
    var model = this.model;
    this.newTextDialog.show('', function(newText) { model.add(newText, true); });
};

EditPage.prototype.onViewItemRemoveClicked = function(item)
{
    this.model.remove(item.name);
};

EditPage.prototype.onViewItemChangeClicked = function(item)
{
    var model = this.model;
    var name = item.name;
    this.newTextDialog.show(name, function(newText) { model.change(name, newText); });
};

EditPage.prototype.onModelItemsLoaded = function()
{
    this.view.refresh(this.model.items);
};

EditPage.prototype.onModelItemRemoved = function(item)
{
    this.view.remove(item);
};
