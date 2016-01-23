/**
 * Created by yassine on 04/01/2016.
 */

Router.route('/fond/:_id', {
    name: 'editFond',
    onAfterAction: function () {
        Session.set('curFondId', this.params._id);
        console.log('Session have the id of curFondId');
        updateForm();
    }
});

Template.editFond.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};


var updateForm = function () {

    var curFond = Fonds.findOne({_id: Session.get('curFondId')});

//    $('.nomBailleur').val(curBailleur.nomBailleur);


};


Template.editFond.events({
    'click .editFond': function (evnt, tmpl) {

        var errorExist = null;
        var file = $('input.file_bag3')[0].files[0];
        var userType = 'admin';

        var curFond = Fonds.findOne({_id: Session.get('curFondId')});

        var fond = {
            _id:curFond._id,
            nomBailleur: tmpl.find('.nomBailleur').value
        };
        /*if (!fond.|| !bailleur.fond) {
            errorExist = true;
        }*/

        if (errorExist) {
            sAlert.error("Merci de renseigner tous les champs obligatoires", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
        } else {
            if (!file) {
                Meteor.call('editFond', fond, function (error, result) {
                    if (error) {
                        sAlert.error("Une erreur est survenue lors de l'enregistrement de ce fond, veuillez contacter votre administrateur !", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });
                    } else {
                        sAlert.info("Fond enregistré avec succes", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 3000,
                            onRouteClose: false,
                            stack: false
                        });
                        Router.go('/budgetFimap');
                    }
                });
            } else {
                uploaderJustif.send(file, function (error, downloadUrl) {
                    if (error) {
                        sAlert.error("Erreur lors de l'upload des justificatifs", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });
                    }
                    else {

                        var fond = {
                            _id:curFond._id,
                            justificatifBailleur: downloadUrl
                        };


                        Meteor.call('editFond', fond, function (error, result) {
                            if (error) {
                                sAlert.error("Une erreur est survenue lors de la modification de ce Fond, veuillez contacter votre administrateur !", {
                                    effect: 'bouncyflip',
                                    position: 'bottom',
                                    timeout: 5000,
                                    onRouteClose: false,
                                    stack: false
                                });
                            } else {
                                sAlert.info("Fond Modifié", {
                                    effect: 'bouncyflip',
                                    position: 'bottom',
                                    timeout: 3000,
                                    onRouteClose: false,
                                    stack: false
                                });

                                Router.go('/budgetFimap');

                            }

                        });
                    }
                });

            }

        }
    }
});