define([],
function() {

function FollowingModel()
{
    this.following = JSON.parse(localStorage.getItem('following')) || [];
}

FollowingModel.prototype.add = function(user)
{
    this.following.push(user);
    localStorage.setItem('following', JSON.stringify(this.following));
}

return FollowingModel;

});
