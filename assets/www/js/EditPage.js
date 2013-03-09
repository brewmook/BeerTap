function EditPage(twitterScreenName, twitter)
{
    var app = this;

    this.newTextDialog = new TextInputDialog("newTextDialog");
    
    var viewCallbacks = {
        addHref:       "#"+this.newTextDialog.id,
        addClicked:    function() { app.onViewAddClicked(); },
        changeHref:    "#"+this.newTextDialog.id,
        changeClicked: function(item) { app.onViewItemChangeClicked(item); },
        removeHref:    "#",
        removeClicked: function(item) { app.onViewItemRemoveClicked(item); },
    };
    this.view = new EditView(twitterScreenName, viewCallbacks);

    this.model = new Model(twitter, {
            itemsLoaded: function() { app.view.refresh(app.model.items, viewCallbacks); },
            itemRemoved: function(item) { app.view.remove(item); }
        });
    this.model.load(twitterScreenName);
  
    this.id = twitterScreenName;
}

EditPage.prototype.onViewAddClicked = function()
{
    var model = this.model;
    this.newTextDialog.show("Add Item", "Enter new text:", '', function(newText) { model.add(newText, true); });
};

EditPage.prototype.onViewItemRemoveClicked = function(item)
{
    this.model.remove(item.name);
};

EditPage.prototype.onViewItemChangeClicked = function(item)
{
    var model = this.model;
    var name = item.name;
    this.newTextDialog.show("Change Item", "Enter new text:", name, function(newText) { model.change(name, newText); });
};
