define([],
function() {

function SubscriptionsModel()
{
    this.subscriptions = JSON.parse(localStorage.getItem('subscriptions')) || [];
}

SubscriptionsModel.prototype.add = function(user)
{
    this.subscriptions.push(user);
    localStorage.setItem('subscriptions', JSON.stringify(this.subscriptions));
}

return SubscriptionsModel;

});
