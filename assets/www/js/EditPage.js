function EditPage(twitterScreenName, twitter)
{
    var app = this;

    this.newTextDialog = new TextInputDialog("newTextDialog", "New text", "Enter new text:");
    this.pinDialog = new TextInputDialog("pinDialog", "Twitter PIN", "Enter authorisation PIN:");

    this.view = new EditView(twitterScreenName, this.newTextDialog, this.pinDialog);
    this.view.addClicked = function() { app.onViewAddClicked(); };
    this.view.authoriseClicked = function() { app.onViewAuthoriseClicked(); };
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

EditPage.prototype.onViewAuthoriseClicked = function()
{
    var dialog = this.pinDialog;
    var model = this.model;
    console.log("Requesting twitter authorisation...");
    this.model.twitter.requestAuthorisationPinURL(
        function(url) {
            console.log(url);
            dialog.show(url,
                        function(pin) {
                            model.twitter.setAuthorisationPin(
                                pin,
                                function(data) {
                                    alert("You're all set, sending real tweets now!");
                                    console.log("Twitter authorisation successful.");
                                    console.log(data);
                                },
                                function(data) {
                                    alert("Dang, your PIN didn't work.");
                                    console.log("Twitter authorisation failed.");
                                    console.log(data);
                                });
                        });
            alert("Go to the URL shown in the PIN dialog, authorise, then come back and enter the PIN instead of the URL.");
        },
        function(data) {
            alert("Failed to request Twitter authorisation URL");
            console.log("FAIL!");
            console.log(data);
        }
    );
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
