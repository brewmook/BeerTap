function OnTap(mainPage)
{
    this.main = mainPage;
    this.pages = mainPage.find(".pages");
    this.twitter = new Twitter(oAuthConfig, localStorage);
    this.pinDialog = new TextInputDialog("pinDialog");
    var ontap = this;
    $("#twitterAuthorise").click(function() { ontap.onTwitterAuthoriseClicked(); });
    if (this.twitter.store.screenName) $("#twitterScreenName").html(this.twitter.store.screenName);

    this.pages.find(".editableDivider").hide();
    this.pages.find(".followingDivider").hide();

    $(document).ajaxStart(function() { $.mobile.loading( 'show' ); });
    $(document).ajaxStop(function() { $.mobile.loading( 'hide' ); });
    $(document).ajaxError(function() { alert("Error fetching data"); });
}

OnTap.prototype.addPage = function(twitterScreenName)
{
    var page;
    var after;
    if (twitterScreenName == this.twitter.authorisedScreenName())
    {
        page = new EditPage(twitterScreenName, this.twitter, this.main);
        after = this.pages.find(".editableDivider");
    }
    else
    {
        page = new ListPage(twitterScreenName, this.twitter);
        after = this.pages.find(".followingDivider");
    }

    var li = $("<li/>").insertAfter(after);
    var a = $("<a/>").attr("href","#"+page.id).append("@"+page.id).appendTo(li);
    after.show();
    $(this.pages).listview('refresh');
};

OnTap.prototype.onTwitterAuthoriseClicked = function()
{
    var ontap = this;
    console.log("Requesting twitter authorisation...");
    this.twitter.requestAuthorisationPinURL(
        function(url) {
            console.log("Success - sending user to "+url);
            ontap.pinDialog.show("Twitter PIN", "Enter authorisation PIN:", url, function(pin) { ontap.onPinSubmit(pin); });
            alert("Go to the URL shown in the PIN dialog, authorise with Twitter, then come back and enter the PIN instead of the URL.");
        },
        function(data) {
            alert("Failed to request Twitter authorisation URL");
            console.log("FAIL!");
            console.log(data);
        }
    );
};

OnTap.prototype.onPinSubmit = function(pin)
{
    var ontap = this;
    this.twitter.setAuthorisationPin(
        pin,
        function(data) {
            alert("You're all set, sending real tweets as " + ontap.twitter.store.screenName + " now!");
            $("#twitterScreenName").html(ontap.twitter.store.screenName);
            console.log("Twitter authorisation successful.");
            console.log(data);
        },
        function(data) {
            alert("Dang, your PIN didn't work.");
            console.log("Twitter authorisation failed.");
            console.log(data);
        });
};
