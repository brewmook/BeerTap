define(['Utility'],
function(Utility) {

    function TwitterBrowserAuthoriser(twitter, authorisationVerifier)
    {
        var authorisationRegexp = /\boauth_token=([^&]+)&oauth_verifier=([^&]+)/;
        var match = authorisationRegexp.exec(window.location.search);
        if (match)
            authorisationVerifier.verify(twitter, match[2], match[1]);
    }

    TwitterBrowserAuthoriser.prototype.authorise = function(twitter)
    {
        console.log("Requesting twitter authorisation...");
        twitter.oAuth.setCallbackUrl(Utility.parentPath(window.location.href));
        twitter.oAuth.fetchRequestToken(
            function(url) {
                console.log(url);
                window.location = url;
            },
            function(data) {
                alert("Failed to request Twitter authorisation URL");
                console.log("FAIL!");
                console.log(data);
            }
        );
    };

    return TwitterBrowserAuthoriser;

});