/**
 * Created by HP on 22/11/2015.
 */
Template.actionActivites.helpers({
    'actions' : function(){
        return Actions.find({regionId: Meteor.user().profile.region._id}).fetch();
    },
    'activites':function(){
        return Projects.find({regionId:Meteor.user().profile.region._id, attachedActionId: this._id},{sort: {projectDate: -1}}).fetch();
    }
});

Template.actionActivites.events({

});