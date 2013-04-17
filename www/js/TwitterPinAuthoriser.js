define(['TextInputDialog'],
function(TextInputDialog) {

    function TwitterPinAuthoriser(verifier)
    {
        this.verifier = verifier;
        this.pinDialog = new TextInputDialog("twitterPinDialog");
    }

    TwitterPinAuthoriser.prototype.authorise = function(twitter)
    {
        var pinDialog = this.pinDialog;
        var verifier = this.verifier;
        twitter.fetchRequestTokenUrl("oob",
            function(url) {
                pinDialog.show("Twitter PIN", "Enter authorisation PIN:", url, function(pin) {
                    // Timeout to give the pin dialog a chance to close properly
                    setTimeout(function() { verifier.verify(pin); }, 250);
                });
                alert("Go to the URL shown in the PIN dialog, authorise with Twitter, then come back and enter the PIN instead of the URL.");
            });
    };

    return TwitterPinAuthoriser;

});