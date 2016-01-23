/**
 * Created by yassine on 05/06/15.
 */

Template.adherents.helpers({

    adherentsList: function () {
        return Adherent.find({adminRegion: Meteor.userId()}).fetch();
    },
    adherentsListAdmin: function () {
        return Adherent.find().fetch();
    },
    nomRegion: function () {
        return Regions.findOne({_id:this.region._id}).nom;
    }

});


Template.adherents.events({

    'click .removeAdherent': function (evnt,tmpl) {
        console.log('we are on the remove of adherent');
        if(tmpl.find('#testRemove').value){
            return;
        } else{
            Meteor.call('removeAdherent', this._id);
        }

    }

});
