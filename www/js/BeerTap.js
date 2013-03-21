define(['Twitter', 'TextInputDialog', 'JQMListView', 'JQMEditView', 'ListPage', 'EditPage', 'SettingsPage'],
function(Twitter, TextInputDialog, JQMListView, JQMEditView, ListPage, EditPage, SettingsPage) {

function BeerTap(mainPage)
{
    var beertap = this;
    this.main = mainPage;
    this.pages = mainPage.find(".pages");
    this.twitter = new Twitter(localStorage);
    this.followDialog = new TextInputDialog("followDialog");
    this.settings = new SettingsPage("settings", this.twitter);

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

    var jqmFactory = {
        newListView: function(id, refreshCallback) { return new JQMListView(id, refreshCallback); },
        newEditView: function(id, callbacks) { return new JQMEditView(id, callbacks); },
    };

    if (twitterScreenName == this.twitter.authorisedScreenName())
    {
        page = new EditPage(twitterScreenName, this.twitter, this.main, jqmFactory);
        after = this.pages.find(".editableDivider");
    }
    else
    {
        page = new ListPage(twitterScreenName, this.twitter, jqmFactory);
        after = this.pages.find(".followingDivider");
    }

    var li = $("<li/>").insertAfter(after);
    var a = $("<a/>").attr("href","#"+page.id).append("@"+page.id).appendTo(li);
    after.show();
    $(this.pages).listview('refresh');
};

return BeerTap;

});
