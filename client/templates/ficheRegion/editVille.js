/**
 * Created by ADMIN on 07/07/2015.
 */
var updateForm = function () {
    var curVille = Villes.findOne({_id: Session.get('curVilleId')});
    $('#nom').val(curVille.nom);

};

Router.route('/villes/:_id', {
    name: 'editVille',
    onAfterAction: function () {
        Session.set('curVilleId', this.params._id);
        console.log('Session have the id of ville');
        updateForm();
    }
});

Template.editVille.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};


Template.editVille.events({

    'click .updateVille':function(evnt,tmpl){

        var errorExit = null;
        var ville = {
            _id: Session.get('curVilleId'),
            nom: tmpl.find('#nom').value
        };

        if (!ville.nom) {
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
            Meteor.call('updateVille', ville, function (error, result) {
                if (error) {
                    sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });
                } else {
                    sAlert.info("update reussi de votre ville", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 3000,
                        onRouteClose: false,
                        stack: false
                    });


                    var reg = Villes.findOne({_id:Session.get('curVilleId')});
                    Router.go('/regions/'+reg.regionId);
                }
            });
        }

    }

});

