/**
 * Created by ADMIN on 07/07/2015.
 */
var updateForm = function () {
    var curRegion = Regions.findOne({_id: Session.get('curRegionId')});
    console.log('this is the current project');
    console.log(curRegion);
    $('#nom').val(curRegion.nom);
    $('#budget').val(curRegion.budget);
    $('#desc').val(curRegion.desc);

    console.log('updating the form');

};

Router.route('/regions/:_id', {
    name: 'editRegion',
    onAfterAction: function () {
        Session.set('curRegionId', this.params._id);
        console.log('Session have the id of region');
        updateForm();
    }
});

Template.editRegion.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};


Template.editRegion.events({

    'click .updateRegion':function(evnt,tmpl){

        var errorExit = null;
        var region = {
            _id: Session.get('curRegionId'),
            nom: tmpl.find('#nom').value,
            desc: tmpl.find('#desc').value
        };

        console.log(region);

        if (!region.nom) {
            errorExit = true;
        }

        if (!region.desc) {
            errorExit = true;
        }

        if (errorExit) {
            sAlert.error("Merci de renseigner les champs obligatoires", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
        } else {
            Meteor.call('updateRegion', region, function (error, result) {
                if (error) {
                    sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });
                } else {
                    sAlert.info("update reussi de votre Region", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 3000,
                        onRouteClose: false,
                        stack: false
                    });

                    Router.go('/regions');
                }
            });
        }

    }

});

Template.createProvince.events({

    'click .valider':function(evnt , tmpl){
        var province = {
            regionId:Session.get('curRegionId'),
            nom: tmpl.find('#province').value,
            codeProvince: tmpl.find('#codeProvince').value
        };

        if(province.nom && province.codeProvince){
            Meteor.call('insertProvince',province);
            $('#province').val('');
            $('#codeProvince').val('');
        } else {
            sAlert.error("Merci de remplir tous les champs de la province", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
        }
    },
    'click .removeProvince': function (){
        Meteor.call('removeProvince', this._id);
    }

});


Template.createProvince.helpers({

    provinces: function(){
        return Provinces.find({regionId:Session.get('curRegionId')}).fetch();
    }

});



Template.createVille.events({

    'click .valider':function(evnt , tmpl){
        ville = {
            regionId:Session.get('curRegionId'),
            nom: tmpl.find('#ville').value
        };

        if(ville.nom){
            Meteor.call('insertVille',ville);
            $('#ville').val('');
        } else {
            sAlert.error("Merci de saisir un nom pour votre ville", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 'none',
                onRouteClose: false,
                stack: false
            });
        }
    },
    'click .removeVille': function (){
        Meteor.call('removeVille', this._id);
    }

});


Template.createVille.helpers({

    villes: function(){
        return Villes.find({regionId:Session.get('curRegionId')}).fetch();
    }

});
