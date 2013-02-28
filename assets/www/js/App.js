function App(viewDiv, twitterScreenName)
{
    var app = this;

    this.view = new View(viewDiv);
    this.view.itemRemoveClicked = function(item) { app.onViewItemRemoveClicked(item); };
    this.view.itemChangeClicked = function(item) { app.onViewItemChangeClicked(item); };

    this.model = new Model();
    this.model.itemsLoaded = function() { app.onModelItemsLoaded(); };
    this.model.itemRemoved = function(item) { app.onModelItemRemoved(item); };
    this.model.load(twitterScreenName);
}

App.prototype.onViewItemRemoveClicked = function(item)
{
    this.model.remove(item.name);
};

App.prototype.onViewItemChangeClicked = function(item)
{
    var model = this.model;
    var input = $('#newTextInput');
    input.val(item.name);
    $('#newTextSubmit').click(function()
    {
	model.change(item.name, input.val());
	$('#newTextDialog').dialog('close');
    });
    $.mobile.changePage('#newTextDialog');
};

App.prototype.onModelItemsLoaded = function()
{
    this.view.refresh(this.model.items);
};

App.prototype.onModelItemRemoved = function(item)
{
    this.view.remove(item);
};
