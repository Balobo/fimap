/**
 * Created by HP on 05/12/2015.
 */
var updateForm = function () {
    var curCommune = Communes.findOne({_id: Session.get('curCommuneId')});
    $('#nom').val(curCommune.nom);

};

Router.route('/commune/:_id', {
    name: 'editCommune',
    onAfterAction: function () {
        Session.set('curCommuneId', this.params._id);
        console.log('Session have the id of commune');
        updateForm();
    }
});

Template.editCommune.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};


Template.editCommune.events({

    'click .updateCommune':function(evnt,tmpl){

        var errorExit = null;
        var commune = {
            _id: Session.get('curCommuneId'),
            nom: tmpl.find('#nom').value
        };

        if (!commune.nom) {
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
            Meteor.call('updateCommune', commune, function (error, result) {
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


                    var com = Communes.findOne({_id:Session.get('curCommuneId')});
                    Router.go('/province/'+com.provinceId);
                }
            });
        }

    }

});