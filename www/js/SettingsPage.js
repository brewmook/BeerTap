define(['Twitter', 'TwitterBrowserAuthoriser', 'TwitterPinAuthoriser', 'SettingsView'],
function(Twitter, TwitterBrowserAuthoriser, TwitterPinAuthoriser, SettingsView) {

function SettingsPage(id, twitter)
{
    this.twitter = twitter;
    this.view = new SettingsView(id);
    this.view.setTwitterScreenName(twitter.authorisedScreenName());
    this.twitterBrowserAuthoriser = new TwitterBrowserAuthoriser(twitter, this.view.authorisers);
    this.twitterPinAuthoriser = new TwitterPinAuthoriser(twitter, this.view.authorisers);
}

return SettingsPage;

});
