function OnTap(mainPage)
{
    this.main = mainPage;
    this.pages = mainPage.find(".pages");
    this.twitter = new Twitter(oAuthConfig, localStorage);
    this.followDialog = new TextInputDialog("followDialog");
    this.twitterPinAuthoriser = new TwitterPinAuthoriser(oAuthConfig);
    var ontap = this;
    $("#twitterAuthorise").click(function() { ontap.twitterPinAuthoriser.authorise(ontap.twitter); });
    if (this.twitter.store.screenName) $("#twitterScreenName").html(this.twitter.store.screenName);

    this.pages.find(".editableDivider").hide();
    this.pages.find(".followingDivider").hide();
    this.main.find(".follow").click(function() { ontap.followDialog.show("Follow", "Twitter user", "@", function(user) { ontap.addPage(user); });})

    $(document).ajaxStart(function() { $.mobile.loading( 'show' ); });
    $(document).ajaxStop(function() { $.mobile.loading( 'hide' ); });
    $(document).ajaxError(function() { alert("Error fetching data"); });
}

OnTap.prototype.addPage = function(twitterScreenName)
{
    var page;
    var after;

    if (twitterScreenName[0] == "@")
        twitterScreenName = twitterScreenName.substring(1);

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
