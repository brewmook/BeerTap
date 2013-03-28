define([],
function() {

function updateStoreAndNotify(following, store, callbacks)
{
    store.setItem('following', JSON.stringify(following));
    callbacks.forEach(function(callback){ callback(following); });
}

function FollowingModel(store)
{
    this.store = store;
    this.following = JSON.parse(store.getItem('following')) || [];
    this._followingChangedCallbacks = [];
}

FollowingModel.prototype.add = function(user)
{
    var i = this.following.indexOf(user);
    if (i < 0)
    {
        this.following.push(user);
        updateStoreAndNotify(this.following, this.store, this._followingChangedCallbacks);
    }
};

FollowingModel.prototype.remove = function(user)
{
    var i = this.following.indexOf(user);
    if (i >= 0)
    {
        this.following.splice(i, 1);
        updateStoreAndNotify(this.following, this.store, this._followingChangedCallbacks);
    }
};

FollowingModel.prototype.onFollowingChanged = function(callback)
{
    this._followingChangedCallbacks.push(callback);
}

return FollowingModel;

});
