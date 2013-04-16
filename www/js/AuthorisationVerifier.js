define(function() {

    function AuthorisationVerifier(twitter, view)
    {
        this.view = view;
        twitter.onAuthorisationChange(function(userId, screenName) { view.success(screenName); });
    }

    AuthorisationVerifier.prototype.verify = function(twitter, verifier, accessToken)
    {
        var view = this.view;
        view.show();
        twitter.verifyAuthorisation(verifier, accessToken, function(data) { view.failure(data); });
    };

    return AuthorisationVerifier;

});
