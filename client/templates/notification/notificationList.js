/**
 * Created by ADMIN on 08/07/2015.
 */

Template.notificationList.helpers({

    currentUserNotifs : function(){
        return Notification.find({notifUserId:Meteor.userId()},{sort: {notifDate: -1}}).fetch();
    },
    allNotifs: function(){
        return Notification.find({}, {sort: {notifDate: -1}}).fetch();
    }

});
