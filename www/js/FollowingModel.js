define([],
function() {

function FollowingModel(store)
{
    this.store = store;
    this.following = JSON.parse(store.getItem('following')) || [];
}

FollowingModel.prototype.add = function(user)
{
    for (var i = 0; i < this.following.length; ++i)
        if (this.following[i] == user) break;

    if (i == this.following.length)
    {
        this.following.push(user);
        this.store.setItem('following', JSON.stringify(this.following));
    }
};

return FollowingModel;

});
