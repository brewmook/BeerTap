function OnTap()
{
    this.pages = [];
    this.twitter = new Twitter("daveappendix", oAuthConfig);
    this.pinDialog = new TextInputDialog("pinDialog", "Twitter PIN", "Enter authorisation PIN:");
    var ontap = this;
    $("#twitterAuthorise").click(function() { ontap.onTwitterAuthoriseClicked(); });
}

OnTap.prototype.addPage = function(page)
{
    this.pages.push(page);
    var li = $("<li/>").appendTo("#pages");
    var a = $("<a/>").attr("href","#"+page.id).append(page.id).appendTo(li);
    $("#pages").listview('refresh');
};

OnTap.prototype.onTwitterAuthoriseClicked = function()
{
    var ontap = this;
    console.log("Requesting twitter authorisation...");
    this.twitter.requestAuthorisationPinURL(
        function(url) {
            console.log("Success - sending user to "+url);
            ontap.pinDialog.show(url, function(pin) { ontap.onPinSubmit(pin); });
            alert("Go to the URL shown in the PIN dialog, authorise with Twitter, then come back and enter the PIN instead of the URL.");
        },
        function(data) {
            alert("Failed to request Twitter authorisation URL");
            console.log("FAIL!");
            console.log(data);
        }
    );
};

OnTap.prototype.onPinSubmit = function(pin)
{
    this.twitter.setAuthorisationPin(
        pin,
        function(data) {
            alert("You're all set, sending real tweets now!");
            console.log("Twitter authorisation successful.");
            console.log(data);
        },
        function(data) {
            alert("Dang, your PIN didn't work.");
            console.log("Twitter authorisation failed.");
            console.log(data);
        });
};
