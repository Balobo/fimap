/**
 * Created by HP on 16/12/2015.
 */

var uploaderJustif = new Slingshot.Upload("myFileUploads");

Template.createDepense.onRendered(function () {
    this.$('.datetimepicker').datetimepicker({
            locale: 'fr',
            format: 'L'
        }
    );
});

Template.createDepense.events({
    'click .addDepense': function (evnt, tmpl) {
        var errorExist = null;
        var file = $('input.file_bag3')[0].files[0];
        var regionId = null;
        var userType = 'admin';
        if(Meteor.user().profile.region){
            regionId = Meteor.user().profile.region._id;
            userType = 'region';
        }

        var depense = {
            userId : Meteor.userId(),
            regionId : regionId,
            userType : userType,
            typeDepense: tmpl.find('#type').value,
            descriptionDepense: tmpl.find('.depenseDesc').value,
            dateDepense: tmpl.find('#inputDate').value,
            lieuDepense: tmpl.find('.depenseLocation').value,
            montantDepense: tmpl.find('.coutDepense').value,
            justificatifDepense  : null
        };
        if (!depense.typeDepense || !depense.dateDepense|| !depense.montantDepense) {
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
            if(!file){
                Meteor.call('addDepense', depense, function (error, result) {
                    if (error) {
                        sAlert.error("Une erreur est survenue lors de l'enregistrement de cette dépense, veuillez contacter votre administrateur !", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });
                    } else {
                        sAlert.info("Dépense enregistrée avec succes", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 3000,
                            onRouteClose: false,
                            stack: false
                        });
                        Router.go('/depensesInternes');
                    }
                });
            }else{
                uploaderJustif.send(file, function (error, downloadUrl){
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
                        var depense = {
                            userId : Meteor.userId(),
                            regionId : regionId,
                            userType : userType,
                            typeDepense: tmpl.find('#type').value,
                            descriptionDepense: tmpl.find('.depenseDesc').value,
                            dateDepense: tmpl.find('#inputDate').value,
                            lieuDepense: tmpl.find('.depenseLocation').value,
                            montantDepense: tmpl.find('.coutDepense').value,
                            justificatifDepense  : downloadUrl
                        };
                        console.log(depense);
                        Meteor.call('addDepense', depense, function (error, result) {
                            if (error) {
                                sAlert.error("Une erreur est survenue lors de l'enregistrement de cette dépense, veuillez contacter votre administrateur !", {
                                    effect: 'bouncyflip',
                                    position: 'bottom',
                                    timeout: 5000,
                                    onRouteClose: false,
                                    stack: false
                                });
                            } else {
                                sAlert.info("Dépense enregistrée avec succès", {
                                    effect: 'bouncyflip',
                                    position: 'bottom',
                                    timeout: 3000,
                                    onRouteClose: false,
                                    stack: false
                                });

                                Router.go('/depensesInternes');

                            }

                        });
                    }
                });

            }

        }
    }
});

Template.progressBarDepenses.helpers({
    progress: function () {
        return Math.round(uploaderJustif.progress() * 100);
    }
});