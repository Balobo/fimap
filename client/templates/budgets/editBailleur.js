/**
 * Created by yassine on 04/01/2016.
 */

Router.route('/bailleur/:_id', {
    name: 'editBailleur',
    onAfterAction: function () {
        Session.set('curBailleurId', this.params._id);
        console.log('Session have the id of curBailleurId');
        updateForm();
    }
});

Template.editBailleur.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};


var updateForm = function () {

    var curBailleur = Bailleurs.findOne({_id: Session.get('curBailleurId')});

    $('.nomBailleur').val(curBailleur.nomBailleur);
    $('.bailleurDesc').val(curBailleur.descriptionBailleur);
    $('.bailleurLocation').val(curBailleur.bailleurLocation);

};


Template.editBailleur.events({
    'click .editBailleur': function (evnt, tmpl) {

        var errorExist = null;
        var file = $('input.file_bag3')[0].files[0];
        var userType = 'admin';

        var curBailleur = Bailleurs.findOne({_id: Session.get('curBailleurId')});

        var bailleur = {
            _id:curBailleur._id,
            nomBailleur: tmpl.find('.nomBailleur').value,
            descriptionBailleur: tmpl.find('.bailleurDesc').value,
            bailleurLocation: tmpl.find('.bailleurLocation').value
        };
        if (!bailleur.nomBailleur || !bailleur.descriptionBailleur) {
            errorExist = true;
        }

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
                Meteor.call('editBailleur', bailleur, function (error, result) {
                    if (error) {
                        sAlert.error("Une erreur est survenue lors de l'enregistrement de ce bailleur, veuillez contacter votre administrateur !", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });
                    } else {
                        sAlert.info("Bailleur enregistré avec succes", {
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

                        var bailleur = {
                            _id:curBailleur._id,
                            nomBailleur: tmpl.find('.nomBailleur').value,
                            descriptionBailleur: tmpl.find('.bailleurDesc').value,
                            bailleurLocation: tmpl.find('.bailleurLocation').value,
                            justificatifBailleur: downloadUrl
                        };


                        Meteor.call('editBailleur', bailleur, function (error, result) {
                            if (error) {
                                sAlert.error("Une erreur est survenue lors de la modification de ce bailleur, veuillez contacter votre administrateur !", {
                                    effect: 'bouncyflip',
                                    position: 'bottom',
                                    timeout: 5000,
                                    onRouteClose: false,
                                    stack: false
                                });
                            } else {
                                sAlert.info("Bailleur Modifié", {
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