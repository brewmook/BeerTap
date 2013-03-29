define(['TapsModel', 'TextInputDialog', 'TwitterConfirmer'],
function(TapsModel, TextInputDialog, TwitterConfirmer) {

    function viewAddClick(model, newTextDialog)
    {
        function callback(newText)
        {
            // Timeout is here to give page chance to change back from the TextInputDialog
            // so that the twitter confirmer dialog shows properly.
            setTimeout(function() { model.add(newText, true); }, 500);
        }
        newTextDialog.show("Add Item", "Enter new text:", '', callback);
    }

    function viewChangeClick(model, newTextDialog, originalName)
    {
        function callback(newText)
        {
            // Timeout is here to give page chance to change back from the TextInputDialog
            // so that the twitter confirmer dialog shows properly.
            setTimeout(function() { model.change(originalName, newText); }, 500);
        }
        newTextDialog.show("Change Item", "Enter new text:", originalName, callback);
    }

    function EditPage(id, twitter, viewFactory)
    {
        var newTextDialog = new TextInputDialog("newTextDialog");
        var view = viewFactory.newEditView(id);
        var model = new TapsModel(new TwitterConfirmer(twitter, view.page));

        view.onAddClicked("#newTextDialog", function() {
            viewAddClick(model, newTextDialog);
        });
        view.onChangeClicked("#newTextDialog", function(item) {
            viewChangeClick(model, newTextDialog, item.name);
        });
        view.onRefreshClicked("#", function() {
            model.load(twitter.authorisedScreenName());
        });
        view.onRemoveClicked("#", function(item) {
            model.remove(item.name);
        });

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
