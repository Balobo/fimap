/**
 * Created by HP on 16/12/2015.
 */

Template.depensesInternes.helpers({
    'depensesList': function(){
        return Depenses.find({userType:'region', regionId:Meteor.user().profile.region._id});
    },
    'depensesListAdmin': function(){
        return Depenses.find({userType:'admin'});
    }
});

Template.depensesInternes.events({

});
