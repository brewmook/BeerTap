define(['Utility'],
function(Utility) {

    function TwitterBrowserAuthoriser(authorisationVerifier)
    {
        var authorisationRegexp = /\boauth_token=([^&]+)&oauth_verifier=([^&]+)/;
        var match = authorisationRegexp.exec(window.location.search);
        if (match)
            authorisationVerifier.verify(match[2], match[1]);
    }

    TwitterBrowserAuthoriser.prototype.authorise = function(twitter)
    {
        twitter.fetchRequestTokenUrl(Utility.parentPath(window.location.href),
            function(url) {
                window.location = url;
            });
    };

    return TwitterBrowserAuthoriser;

});