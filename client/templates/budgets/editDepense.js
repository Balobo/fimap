/**
 * Created by HP on 16/12/2015.
 */
var uploaderJustifEdit = new Slingshot.Upload("myFileUploads");

Template.editDepense.onRendered(function () {
    this.$('.datetimepicker').datetimepicker({
            locale: 'fr',
            format: 'L'
        }
    );
});

Router.route('/depense/:_id', {
    name: 'editDepense',
    onAfterAction: function () {
        Session.set('curDepenseId', this.params._id);
        updateForm();
    }
});

var updateForm = function () {
    var curDepense = Depenses.findOne({_id: Session.get('curDepenseId')});
    $('.depenseDesc').val(curDepense.descriptionDepense);
    $('.depenseDate').val(curDepense.dateDepense);
    $('.depenseLocation').val(curDepense.lieuDepense);
    $('.coutDepense').val(curDepense.montantDepense);
};

Template.editDepense.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })
};

Template.editDepense.helpers({
    'currentDepenseType':function(){
        return Depenses.findOne({_id: Session.get('curDepenseId')}).typeDepense;
    },
    'fichierActuel':function(){
        return Depenses.findOne({_id: Session.get('curDepenseId')}).justificatifDepense;
    }
});

Template.editDepense.events({
    'click .editDepense': function (evnt, tmpl) {
        var errorExist = null;
        var oldDepense = Depenses.findOne({_id: Session.get('curDepenseId')});
        var file = $('input.file_bag3')[0].files[0];

        if(!file){
            var depense = {
                _id:Session.get('curDepenseId'),
                typeDepense: tmpl.find('#type').value,
                descriptionDepense: tmpl.find('.depenseDesc').value,
                dateDepense: tmpl.find('#inputDate').value,
                lieuDepense: tmpl.find('.depenseLocation').value,
                montantDepense: tmpl.find('.coutDepense').value,
                justificatifDepense  : oldDepense.justificatifDepense
            };
            if (!depense.typeDepense || !depense.dateDepense|| !depense.montantDepense) {
                errorExist = true;
            }
            if(errorExist){
                sAlert.error("Merci de renseigner tous les champs obligatoires", {
                    effect: 'bouncyflip',
                    position: 'bottom',
                    timeout: 5000,
                    onRouteClose: false,
                    stack: false
                });
            }else{
                Meteor.call('editDepense', depense, function (error, result) {
                    if (error) {
                        sAlert.error("Une erreur est survenue lors de la mise à jour de cette dépense, veuillez contacter votre administrateur !", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });
                    } else {
                        sAlert.info("Dépense mise à jour avec succès", {
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
        }else{
            uploaderJustifEdit.send(file, function (error, downloadUrl){
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
                        _id:Session.get('curDepenseId'),
                        typeDepense: tmpl.find('#type').value,
                        descriptionDepense: tmpl.find('.depenseDesc').value,
                        dateDepense: tmpl.find('#inputDate').value,
                        lieuDepense: tmpl.find('.depenseLocation').value,
                        montantDepense: tmpl.find('.coutDepense').value,
                        justificatifDepense  : downloadUrl
                    };
                    console.log(depense);
                    Meteor.call('editDepense', depense, function (error, result) {
                        if (error) {
                            sAlert.error("Une erreur est survenue lors de la mise à jour de cette dépense, veuillez contacter votre administrateur !", {
                                effect: 'bouncyflip',
                                position: 'bottom',
                                timeout: 5000,
                                onRouteClose: false,
                                stack: false
                            });
                        } else {
                            sAlert.info("Dépense mise à jour avec succès", {
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
});

Template.progressBarEditDepenses.helpers({
    progress: function () {
        return Math.round(uploaderJustifEdit.progress() * 100);
    }
});