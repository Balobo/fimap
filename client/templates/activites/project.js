/**
 * Created by yassine on 09/03/15.
 */

var uploader = new Slingshot.Upload("myFileUploads");

Template.createProject.created = function () {
    this.selectedActionDate = new ReactiveVar(null);
};

Template.createProject.events({


    'click .saveProject': function (evt, tmp) {

        var files = $('input.file_bag')[0].files[0];
        var errorExist = null;
        if (!files) {
            errorExist = 1;
        }
        if (errorExist) {
            sAlert.error("Merci de choisir une photo de couverture pour votre projet", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 3000,
                onRouteClose: false,
                stack: false
            });
        }
        else {
            uploader.send(files, function (error, downloadUrl) {
                var curActionId = tmp.find('#action').value;
                var curAction = Actions.findOne({_id: curActionId});
                var project = {
                    projectOwner: Meteor.userId(),
                    projectUsername: Meteor.user().username,
                    projectType: tmp.find('#type').value,
                    projectTitle: tmp.find('.projectTitle').value,
                    projectDesc: tmp.find('.projectDesc').value,
                    projectLocation: tmp.find('.projectLocation').value,
                    projectDate: tmp.find('.projectDate').value,
                    projectDepense: tmp.find('.projectDepense').value,
                    projectCover: downloadUrl,
                    attachedActionId: curActionId,
                    attachedAction: curAction,
                    adminRegion: Meteor.user(),
                    region: Meteor.user().profile.region,
                    regionId: Meteor.user().profile.region._id
                };
                var currId;
                var currObject;
                if (error) {
                    sAlert.error("Erreur lors de l'upload de l'image, la creation du projet a été abandonné", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 3000,
                        onRouteClose: false,
                        stack: false
                    });
                }
                else {

                    if (project.attachedAction) {
                        console.log('project obj: *******//////////*********////////');
                        console.log(project);
                        console.log('attached action : *******//////////*********////////' + project.attachedAction);
                        if (curAction.budgetRestant < project.projectDepense) {
                            sAlert.error("Le budget dédié à l'action séléctionnée n'est pas suffisant!", {
                                effect: 'bouncyflip',
                                position: 'bottom',
                                timeout: 5000,
                                onRouteClose: false,
                                stack: false
                            });
                        } else {
                            Meteor.call('saveProject', project, function (error, result) {
                                currId = result;
                                currObject = Projects.find({_id: currId}).fetch();
                                console.log(currObject);

                                if (error) {
                                    sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                                        effect: 'bouncyflip',
                                        position: 'bottom',
                                        timeout: 5000,
                                        onRouteClose: false,
                                        stack: false
                                    });
                                } else {
                                    sAlert.info("Sauvegarde Reussie de votre activité, elle apparait sur votre journal", {
                                        effect: 'bouncyflip',
                                        position: 'bottom',
                                        timeout: 3000,
                                        onRouteClose: false,
                                        stack: false
                                    });

                                    // TODO : regler le profile cover
                                    var options =
                                    {
                                        type: 'activite',
                                        text: project.projectDesc,
                                        parent: null,
                                        username: Meteor.user().username,
                                        userId: Meteor.userId(),
                                        date: new Date(),
                                        postPicUrl: project.projectCover,
                                        attachedObject: currId
                                    };

                                    Meteor.call('addPost', options);
                                    console.log('POST SAUVEGARDÉ ===============');

                                    var depenseAction = curAction.budgetRestant;
                                    var resteBudgetAction = depenseAction - project.projectDepense;
                                    console.log(depenseAction);

                                    var regionBudget = Budgets.findOne({regionId: Meteor.user().profile.region._id});
                                    console.log('ci dessous le budget===================');
                                    console.log(regionBudget);

                                    var reste = regionBudget.reste - project.projectDepense;
                                    var depenses = regionBudget.depense + project.projectDepense;

                                    console.log('le rest est de  =' + reste);
                                    console.log('la depense est de   =' + depenses);

                                    var budgetUpdate = {
                                        _id: regionBudget._id,
                                        reste: reste,
                                        depense: depenses
                                    };

                                    console.log("l'objet budget pour updater ==========");

                                    console.log(budgetUpdate);
                                    Meteor.call('updateBudgetDetails', budgetUpdate);
                                    console.log('Bugdet update success =============');

                                    var actionToUpdate = {
                                        _id: curActionId,
                                        reste: resteBudgetAction
                                    };

                                    Meteor.call('updateActionRealisation', actionToUpdate);
                                    console.log('Action update success =============');
                                }

                                if (currId) {
                                    Router.go('/project/' + currId);
                                }
                            });
                        }
                    } else {
                        sAlert.error("Il faut selectionner une action", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });
                    }
                }

            });

        }
    },
    'change #action': function (evt, instance) {
        var actionId = $(evt.target).val();
        var action = Actions.findOne({_id: actionId});
        var actionDate = action.date;
        var actionLieu = action.lieux;
        $('.datetimepicker').val(actionDate);
        $('.projectLocation').val(actionLieu);
        //setDateTimePicker(minDate);


        /*.datetimepicker( "option", "minDate", new Date(actionDate.split('.')[2], actionDate.split('.')[1] - 1, actionDate.split('.')[0]) );/*datetimepicker({
         locale: 'fr',
         format: 'DD.MM.YYYY',
         defaultDate: new Date(),
         minDate : new Date(actionDate.split('.')[2], actionDate.split('.')[1] - 1, actionDate.split('.')[0])
         });*/
    }

});

function setDateTimePicker(minDate) {
    jQuery(function () {
        $('.datetimepicker').data("DateTimePicker").minDate(minDate);
        /*$('.datetimepicker').setOptions({
         minDate: minDate
         });*/
    });

    //
}


Template.createProject.helpers({
    actions: function () {
        return Actions.find({regionId: Meteor.user().profile.region._id, statut: 'Validé'}).fetch();
    }
});

Template.createProject.onRendered(function () {
    /*var actionDate = Template.instance().selectedActionDate.get();
     console.log(actionDate);*/
    this.$('.datetimepicker').datetimepicker({
            locale: 'fr',
            format: 'DD.MM.YYYY',
            useCurrent: false
        }
    );
    /*$("#action").change(function (evt, instance) {
        var actionId = $(evt.target).val();
        var actionDate = Actions.findOne({_id: actionId}).date;
        console.log(actionDate);
        var minDate = new Date(actionDate.split('.')[2], actionDate.split('.')[1] - 1, actionDate.split('.')[0]);
        console.log(minDate);
        var picker = $('#datetimepicker').data('datetimepicker');
        picker.minDate(minDate);
        //$('#inputDate').data('datetimepicker').minDate(minDate);
    });*/
    /*
     $("#datetimepicker6").on("dp.change", function (e) {
     $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
     });*/
});

Template.progressBarCr.helpers({
    progress: function () {
        console.log(uploader.progress());
        return Math.round(uploader.progress() * 100);
    }
});
