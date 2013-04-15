define(function() {

    function AuthorisationVerifier(view)
    {
        this.view = view;
    }

    AuthorisationVerifier.prototype.verify = function(twitter, oAuth, verifier)
    {
        var view = this.view;

        view.show();

        function failure(data)
        {
            view.failure(data);
        }

        function success(data)
        {
            var match = /oauth_token=(.*)&oauth_token_secret=(.*)&user_id=(.*)&screen_name=(.*)/.exec(data.text);
            if (match)
            {
                twitter.setAuthorisation(match[1], match[2], match[3], match[4]);
                view.success(match[3], match[4]);
            }
            else
            {
                view.failure(data);
            }
        }

        oAuth.setVerifier(verifier);
        oAuth.fetchAccessToken(success, failure);
    };

    return AuthorisationVerifier;

});
