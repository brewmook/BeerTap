define(function() {

    function TwitterInAppBrowserAuthoriser(verifier)
    {
        this.verifier = verifier;
    }

    TwitterInAppBrowserAuthoriser.prototype.authorise = function(twitter)
    {
        console.log("Requesting twitter authorisation...");
        var verifier = this.verifier;
        twitter.oAuth.setCallbackUrl("https://github.com/coolhandmook/BeerTap");
        twitter.oAuth.fetchRequestToken(
            function(url) {
                var browser = window.open(url, '_blank');
                browser.addEventListener('loadstart', function(event) {
                    var split = event.url.split('?');
                    console.log(split);
                    if (split[0] == callbackUrl)
                    {
                        browser.close();
                        var authorisationRegexp = /\boauth_token=([^&]+)&oauth_verifier=([^&]+)/;
                        var match = authorisationRegexp.exec(split[1]);
                        if (match)
                            verifier.verify(twitter, match[2], match[1]);
                    }
                });
            },
            function(data) {
                alert("Failed to request Twitter authorisation URL");
                console.log("FAIL!");
                console.log(data);
            }
        );
    };

    return TwitterInAppBrowserAuthoriser;

});