/**
 * Created by yassine on 04/01/2016.
 */
/**
 * Created by HP on 16/12/2015.
 */

var uploaderJustif = new Slingshot.Upload("myFileUploads");

Template.createFond.onRendered(function () {
    this.$('.datetimepicker').datetimepicker({
            locale: 'fr',
            format: 'L'
        }
    );
});


Template.createFond.events({
    'click .addFond': function (evnt, tmpl) {

        var errorExist = null;
        var file = $('input.file_bag3')[0].files[0];


        var fond = {
            userId: Meteor.userId(),
            idBailleur: tmpl.find('.idBailleur').value,
            montantFond: tmpl.find('.montantFond').value,
            dateFond: tmpl.find('.dateFond').value,
            justificatifFond: null
        };

        if (!fond.nomFond || !fond.montantFond) {
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
                Meteor.call('addFond', fond, function (error, result) {
                    if (error) {
                        sAlert.error("Une erreur est survenue lors de l'enregistrement de ce Fond, veuillez contacter votre administrateur !", {
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
                            userId: Meteor.userId(),
                            idBailleur: tmpl.find('.idBailleur').value,
                            montantFond: tmpl.find('.montantFond').value,
                            dateFond: tmpl.find('.dateFond').value,
                            justificatifFond: downloadUrl
                        };

                        Meteor.call('addFond', fond, function (error, result) {
                            if (error) {
                                sAlert.error("Une erreur est survenue lors de l'enregistrement de ce Fond, veuillez contacter votre administrateur !", {
                                    effect: 'bouncyflip',
                                    position: 'bottom',
                                    timeout: 5000,
                                    onRouteClose: false,
                                    stack: false
                                });
                            } else {
                                sAlert.info("Fond enregistré", {
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

Template.progressBarFond.helpers({
    progress: function () {
        return Math.round(uploaderJustif.progress() * 100);
    }
});

Template.createFond.helpers({
    bailleurList: function () {
        return Bailleurs.find().fetch();
    }
});