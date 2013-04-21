define(function() {

    function TwitterInAppBrowserAuthoriser(verifier)
    {
        this.verifier = verifier;
    }

    TwitterInAppBrowserAuthoriser.prototype.authorise = function(twitter)
    {
        var verifier = this.verifier;
        twitter.fetchRequestTokenUrl("https://github.com/coolhandmook/BeerTap",
            function(url) {
                var browser = window.open(url, '_blank');
                browser.addEventListener('loadstart', function(event) {
                    var authorisationRegexp = /\boauth_token=([^&]+)&oauth_verifier=([^&]+)/;
                    var match = authorisationRegexp.exec(event.url);
                    if (match)
                    {
                        browser.close();
                        verifier.verify(match[2], match[1]);
                    }
                });
            });
    };

    return TwitterInAppBrowserAuthoriser;

});