define(['TapsModel', 'TextInputDialog', 'TwitterConfirmer'],
function(TapsModel, TextInputDialog, TwitterConfirmer) {

    function onViewAddClicked(model, newTextDialog)
    {
        function callback(newText)
        {
            // Timeout is here to give page chance to change back from the TextInputDialog
            // so that the twitter confirmer dialog shows properly.
            setTimeout(function() { model.add(newText, true); }, 300);
        }
        newTextDialog.show("Add Item", "Enter new text:", '', callback);
    }

    function onViewItemChangeClicked(model, newTextDialog, originalName)
    {
        function callback(newText)
        {
            // Timeout is here to give page chance to change back from the TextInputDialog
            // so that the twitter confirmer dialog shows properly.
            setTimeout(function() { model.change(originalName, newText); }, 300);
        }
        newTextDialog.show("Change Item", "Enter new text:", originalName, callback);
    }

    function EditPage(twitterScreenName, twitter, viewFactory)
    {
        var app = this;

        var newTextDialog = new TextInputDialog("newTextDialog");

        var viewCallbacks = {
            removeHref:    "#",
            removeClicked: function(item) { app.model.remove(item.name); },
            refreshHref:    "#",
            refreshClicked: function() { app.model.load(twitterScreenName); }
        };

        this.view = viewFactory.newEditView(twitterScreenName, viewCallbacks);
        this.view.onAddClicked("#newTextDialog", function() {
            onViewAddClicked(app.model, newTextDialog);
        });
        this.view.onChangeClicked("#newTextDialog", function(item) {
            onViewItemChangeClicked(app.model, newTextDialog, item.name);
        });

        this.model = new TapsModel(new TwitterConfirmer(twitter, this.view.page));
        this.model.onItemsLoaded(function(items) { app.view.refresh(items, viewCallbacks); });
        this.model.onItemRemoved(function(item) { app.view.remove(item); });

        this.id = twitterScreenName;
    }

    EditPage.prototype.show = function(title, twitterScreenName)
    {
        this.view.clear();
        this.view.setHeading(title);
        this.model.load(twitterScreenName);
    };

    return EditPage;

});
