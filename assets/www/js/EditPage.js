function EditPage(twitterScreenName, twitter, parentPage)
{
    var app = this;

    this.newTextDialog = new TextInputDialog("newTextDialog");
    
    var newTextHref = "#"+this.newTextDialog.id;
    var viewCallbacks = {
        addHref:       newTextHref,
        addClicked:    function() { app.onViewAddClicked(); },
        changeHref:    newTextHref,
        changeClicked: function(item) { app.onViewItemChangeClicked(item); },
        removeHref:    "#",
        removeClicked: function(item) { app.onViewItemRemoveClicked(item); },
        refreshHref:    "#",
        refreshClicked: function() { app.model.load(twitterScreenName); }
    };

    var modelCallbacks = {
        itemsLoaded: function() { app.view.refresh(app.model.items, viewCallbacks); },
        itemRemoved: function(item) { app.view.remove(item); }
    };

    this.view = new EditView(twitterScreenName, viewCallbacks);
    this.model = new Model(new TwitterConfirmer(twitter, this.view.page), modelCallbacks);

    this.view.page.on("pageshow", function( event, ui )
    {
        if (parentPage[0] == ui.prevPage[0]) viewCallbacks.refreshClicked();
    });

    this.id = twitterScreenName;
}

EditPage.prototype.onViewAddClicked = function()
{
    var model = this.model;
    function callback(newText)
    {
        // Timeout is here to give page chance to change back from the TextInputDialog
        // so that the twitter confirmer dialog shows properly.
        setTimeout(function() { model.add(newText, true); }, 200);
    }
    this.newTextDialog.show("Add Item", "Enter new text:", '', callback);
};

EditPage.prototype.onViewItemRemoveClicked = function(item)
{
    this.model.remove(item.name);
};

EditPage.prototype.onViewItemChangeClicked = function(item)
{
    var model = this.model;
    var name = item.name;
    function callback(newText)
    {
        // Timeout is here to give page chance to change back from the TextInputDialog
        // so that the twitter confirmer dialog shows properly.
        setTimeout(function() { model.change(name, newText); }, 200);
    }
    this.newTextDialog.show("Change Item", "Enter new text:", name, callback);
};
