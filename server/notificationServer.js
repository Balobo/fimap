/**
 * Created by ADMIN on 08/07/2015.
 */


Meteor.methods({
    'saveNotif': function(obj){
        Notification.insert(obj);
    }
})