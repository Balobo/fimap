/**
 * Created by yassine on 11/03/15.
 */


Router.route('/user/:_id', {
    name: 'userProfile',
    onAfterAction: function () {
        Session.set('currUserId', this.params._id);
        console.log(Session.get('currUserId'));
    }
});


Template.userProfile.events({

    'click .updateProfile': function (evnt, tmpl) {

        return true;

    }

});


Template.profileBoxTemplate.events({

    'click .addFriend': function () {
        var requestFreinds = {
            userId: Session.get('currUserToRequest'),
            requestedFriend: Meteor.user()
        };
        console.log(requestFreinds);
        Meteor.call('insertRequestedFriendships', requestFreinds);
        console.log("demande d'amis enregistrée");
    }


});


Template.profileBoxTemplate.helpers({

    currUser: function () {
        Session.set('currUserToRequest', Session.get('currUserId'));
        return Meteor.users.findOne({_id: Session.get('currUserId')});
    },
    friendsNumber: function () {
        return 0;
    }

});


Template.contactTemplate.helpers({
    'currUser': function () {
        return Meteor.users.findOne({_id: Session.get('currUserId')});
    }
});

Template.infosTemplate.helpers({
    'currUser': function () {
        return Meteor.users.findOne({_id: Session.get('currUserId')});
    }
});

Template.friendsTemplate.helpers({

    friendsList: function () {
        var test = Meteor.users.find({"profile.friends": 1}).fetch();
        console.log('this is the friend list');
        console.log(test);
        var array = new Array();
        array.push(Meteor.user().profile.friends);
        return array;
    }

});

Template.friendsRequests.helpers({

    friendsRequests: function () {
        console.log('we are in the users requesting list');
        var test = RequestedFriendships.find({userId: Meteor.userId()}).fetch();
        console.log(test);
        return test;
    }
});

Template.friendsRequests.events({

    'click .acceptFriend': function () {
        var test = RequestedFriendships.find({userId: Meteor.userId()}).fetch();
        console.log('this is the result in the accepti action');
        console.log(test);
        var curr = this.requestedFriend._id;
        console.log('id');
        console.log(curr);
        if (test) {
            Meteor.users.update({_id: Meteor.userId()}, {$push: {"profile.friends": this.requestedFriend}});
            Meteor.users.update({_id: this.requestedFriend._id}, {$push: {"profile.friends": Meteor.user()}});
        }
        // Meteor.call('updateFriendShipsStatus',test);
    }

});
