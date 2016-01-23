/**
 * Created by yassine on 04/01/2016.
 */
/**
 * Created by HP on 16/12/2015.
 */

var uploaderJustif = new Slingshot.Upload("myFileUploads");

Template.createBailleur.onRendered(function () {
    this.$('.datetimepicker').datetimepicker({
            locale: 'fr',
            format: 'L'
        }
    );
});

Template.createBailleur.events({
    'click .addBailleur': function (evnt, tmpl) {

        var errorExist = null;
        var file = $('input.file_bag3')[0].files[0];
        var userType = 'admin';


        var bailleur = {
            userId: Meteor.userId(),
            userType: userType,
            nomBailleur: tmpl.find('.nomBailleur').value,
            descriptionBailleur: tmpl.find('.bailleurDesc').value,
            bailleurLocation: tmpl.find('.bailleurLocation').value,
            justificatifDepense: null
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
                Meteor.call('addBailleur', bailleur, function (error, result) {
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
                            userId: Meteor.userId(),
                            userType: userType,
                            nomBailleur: tmpl.find('.nomBailleur').value,
                            descriptionBailleur: tmpl.find('.bailleurDesc').value,
                            bailleurLocation: tmpl.find('.bailleurLocation').value,
                            justificatifBailleur: downloadUrl
                        };


                        Meteor.call('addBailleur', bailleur, function (error, result) {
                            if (error) {
                                sAlert.error("Une erreur est survenue lors de l'enregistrement de ce bailleur, veuillez contacter votre administrateur !", {
                                    effect: 'bouncyflip',
                                    position: 'bottom',
                                    timeout: 5000,
                                    onRouteClose: false,
                                    stack: false
                                });
                            } else {
                                sAlert.info("Bailleur enregistré", {
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
    },
    'click .removeBailleur': function (evnt, tmpl) {
        if (tmpl.find('#testRemove').value) {
            return;
        } else {
            Meteor.call('removeBailleur', this._id);
        }
    }
});

Template.progressBarBailleur.helpers({
    progress: function () {
        return Math.round(uploaderJustif.progress() * 100);
    }
});

Template.createBailleur.helpers({
    bailleurList: function () {
        return Bailleurs.find();
    }
});