define(function() {

    function AuthorisationVerifier(view)
    {
        this.view = view;
    }

    AuthorisationVerifier.prototype.verify = function(twitter, oAuth, verifier)
    {
        var view = this.view;

        view.show("Verifying", "Please wait...", false);

        function failure(data)
        {
            view.show("Failed", "Twitter authorisation failed", true);
            console.log("Twitter authorisation failed.");
            console.log(data);
        }

        function success(data)
        {
            var match = /oauth_token=(.*)&oauth_token_secret=(.*)&user_id=(.*)&screen_name=(.*)/.exec(data.text);
            if (match)
            {
                twitter.setAuthorisation(match[1], match[2], match[3], match[4]);
                view.show("Success", "Sending tweets as " + twitter.authorisedScreenName(), true);
                console.log("Twitter authorisation successful.");
                console.log(data);
            }
            else
            {
                failure(data);
            }
        }

        oAuth.setVerifier(verifier);
        oAuth.fetchAccessToken(success, failure);
    };

    return AuthorisationVerifier;

});
