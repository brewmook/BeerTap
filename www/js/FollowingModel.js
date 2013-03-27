define([],
function() {

function FollowingModel(store)
{
    this.store = store;
    this.following = JSON.parse(store.getItem('following')) || [];
}

FollowingModel.prototype.add = function(user)
{
    this.following.push(user);
    this.store.setItem('following', JSON.stringify(this.following));
};

return FollowingModel;

});
