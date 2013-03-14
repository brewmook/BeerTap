function BeerTap(mainPage, settingsPage)
{
    var beertap = this;
    this.main = mainPage;
    this.pages = mainPage.find(".pages");
    this.twitter = new Twitter(oAuthConfig, localStorage);
    this.followDialog = new TextInputDialog("followDialog");
    this.twitterBrowserAuthoriser = new TwitterBrowserAuthoriser(this.twitter, oAuthConfig, settingsPage.find(".authorisers"));
    this.twitterPinAuthoriser = new TwitterPinAuthoriser(this.twitter, oAuthConfig, settingsPage.find(".authorisers"));
    if (this.twitter.authorisedScreenName()) $("#twitterScreenName").html(this.twitter.authorisedScreenName());

    this.pages.find(".editableDivider").hide();
    this.pages.find(".followingDivider").hide();
    this.main.find(".follow").click(function() {
        beertap.followDialog.show("Follow", "Twitter user", "@", function(user) {
            beertap.following.push(user);
            localStorage.setItem('following', JSON.stringify(beertap.following));
            beertap.addPage(user);
        });
    });

    this.following = JSON.parse(localStorage.getItem('following')) || [];
    this.following.forEach(function(follow)
    {
        beertap.addPage(follow);
    });

    $(document).ajaxStart(function() { $.mobile.loading( 'show' ); });
    $(document).ajaxStop(function() { $.mobile.loading( 'hide' ); });
    $(document).ajaxError(function() { alert("Error fetching data"); });
}

BeerTap.prototype.addPage = function(twitterScreenName)
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
