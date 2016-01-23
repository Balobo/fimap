/**
 * Created by yassine on 13/06/15.
 */


Meteor.methods({
    'insertRequestedFriendships':function(obj){
        RequestedFriendships.insert(obj);
    }
});