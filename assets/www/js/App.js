function App(viewDiv, twitterScreenName)
{
    var app = this;

    this.view = new View(viewDiv);
    this.view.addClicked = function() { app.onViewAddClicked(); };
    this.view.itemRemoveClicked = function(item) { app.onViewItemRemoveClicked(item); };
    this.view.itemChangeClicked = function(item) { app.onViewItemChangeClicked(item); };

    this.model = new Model();
    this.model.itemsLoaded = function() { app.onModelItemsLoaded(); };
    this.model.itemRemoved = function(item) { app.onModelItemRemoved(item); };
    this.model.load(twitterScreenName);
}

App.prototype.onViewAddClicked = function()
{
    var model = this.model;
    this.showNewTextDialog('', function(newText) { model.add(newText, true); });
};

App.prototype.onViewItemRemoveClicked = function(item)
{
    this.model.remove(item.name);
};

App.prototype.onViewItemChangeClicked = function(item)
{
    var model = this.model;
    var name = item.name;
    this.showNewTextDialog(name, function(newText) { model.change(name, newText); });
};

App.prototype.onModelItemsLoaded = function()
{
    this.view.refresh(this.model.items);
};

App.prototype.onModelItemRemoved = function(item)
{
    this.view.remove(item);
};

App.prototype.showNewTextDialog = function(text, callback)
{
    var input = $('#newTextInput');
    input.val(text);
    $('#newTextSubmit').unbind('click').click(function()
    {
        callback(input.val());
        $('#newTextDialog').dialog('close');
    });
    $.mobile.changePage('#newTextDialog');
};
