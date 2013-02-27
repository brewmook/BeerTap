var app = {

    model: new Model(),
    view: new View($("#current")),

    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
	this.view.itemRemoveClicked = this.onItemRemoveClicked;
    },

    onItemRemoveClicked: function(item)
    {
	app.model.remove(item);
	app.view.remove(item);
	twitter.tweet("OFF: " + item.name);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function()
    {
	$.getJSON(twitter.timelineQuery("TheBatTaps"), function(data)
        {
	    app.model.parseTweets(data);
	    app.view.refresh(app.model.items);
	});
    },

};
