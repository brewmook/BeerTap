define(['TapsModel', 'TextInputDialog', 'TwitterConfirmer'],
function(TapsModel, TextInputDialog, TwitterConfirmer) {

    function EditPage(id, twitter, viewFactory)
    {
        var newTextDialog = new TextInputDialog("newTextDialog");
        var view = viewFactory.newEditView(id);
        var model = new TapsModel(new TwitterConfirmer(twitter, view.page));

        view.onAddClicked("#newTextDialog", function() {
            newTextDialog.show("Add Item", "Enter new text:", '', function(newText) {
                model.add(newText, true);
            });
        });
        view.onChangeClicked("#newTextDialog", function(item) {
            newTextDialog.show("Change Item", "Enter new text:", item.name, function(newText) {
                model.change(item.name, newText);
            });
        });
        view.onRefreshClicked("#", function() { model.load(twitter.authorisedScreenName()); });
        view.onRemoveClicked("#", function(item) { model.remove(item.name); });

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
