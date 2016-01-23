/**
 * Created by yassine on 05/06/15.
 */

Template.regions.helpers({

    regionsList: function () {

        return Regions.find().fetch();
    }

});


Template.regions.events({

    'click .removeRegion': function (evnt,tmpl) {
        console.log('we are on the remove of action');
        if(tmpl.find('#testRemove').value){
            return;
        } else{
            Meteor.call('removeRegion', this._id);
        }

    }

});
