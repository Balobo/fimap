/**
 * Created by yassine on 11/03/15.
 */
Template.navigation.events({

    'click .logout':function(){
        Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.online":false}});
        Meteor.logout();
        Router.go('/');
    }
});

Template.navigation.helpers({

    recentNotif:function(){
        console.log(Notification.find({}, {sort: {notifDate: -1}, limit: 4}).fetch());
        return Notification.find({}, {sort: {notifDate: -1}, limit: 4}).fetch();
    }

});