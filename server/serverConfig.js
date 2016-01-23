/**
 * Created by yassine on 23/05/15.
 */
Meteor.publish("userStatus", function() {
    return Meteor.users.find({ "status.online": true });
});