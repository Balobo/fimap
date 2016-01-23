/**
 * Created by yassine on 10/03/15.
 */

Handlebars.registerHelper('selectedIfEquals', function (left, right) {
    return left == right ? "selected" : "";
});

/*Slingshot.fileRestrictions("myFileUploads", {
 allowedFileTypes: 'application/pdf',
 //maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
 maxSize: null
 });*/

var uploader = new Slingshot.Upload("myFileUploads");
var uploader2 = new Slingshot.Upload("myFileUploads");
var uploader3 = new Slingshot.Upload("myFileUploads");

var updateForm = function () {
    var curProject = Projects.findOne({_id: Session.get('curProjectId')});
    console.log('this is the current project');
    console.log(curProject);
    $('.projectDesc').val(curProject.projectDesc);
    $('.projectType').val(curProject.projectType);
    $('.projectTitle').val(curProject.projectTitle);
    $('.projectDepense').val(curProject.projectDepense);
    $('.projectLocation').val(curProject.projectLocation);
    $('.projectDate').val(curProject.projectDate);
    //$('#action').val(curProject.attachedAction);
    console.log('updating the form');

};

Router.route('/project/:_id', {
    name: 'editProject',
    onAfterAction: function () {
        Session.set('curProjectId', this.params._id);
        console.log('Session have the id');
        updateForm();
    }
});

Template.progressBar.helpers({
    progress: function () {
        console.log(uploader.progress());
        return Math.round(uploader.progress() * 100);
    }
});

Template.progressBar2.helpers({
    progress: function () {
        console.log(uploader2.progress());
        return Math.round(uploader2.progress() * 100);
    }
});

Template.progressBar3.helpers({
    progress: function () {
        console.log(uploader3.progress());
        return Math.round(uploader3.progress() * 100);
    }
});


Template.editProject.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};

Template.editProject.onRendered(function () {
    //var project = Projects.findOne({_id: Session.get('curProjectId')});
    //var date = new Date(project.projectDate);
    this.$('.datetimepicker').datetimepicker({
            locale: 'fr',
            format: 'L'
        }
    );
});

Template.projectPicture.events({
    'click .removeProjectPic': function () {
        Meteor.call('removeProjectPicture', this._id);
    }
});


Template.projectFile.events({
    'click .removeProjectFile': function () {
        Meteor.call('removeProjectFile', this._id);
    }
});

Template.editProject.events({
    'click .updateProject': function (evt, tmpl) {
        var files = $('input.file_bag')[0].files[0];
        //console.log(files);
        //console.log('tring to update the activiti');
        var curActionId = tmpl.find('#action').value;
        var curAction = Actions.findOne({_id: curActionId});

        if (files) {
            uploader.send(files, function (error, downloadUrl) {
                //console.log(downloadUrl);

                if (error) {
                    sAlert.error("Une Erreur s'est produite lors de l'upload de l'image", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });
                }
                //console.log('updating with cover');
                var project = {
                    _id: Session.get('curProjectId'),
                    projectType: tmpl.find('.projectType').value,
                    projectTitle: tmpl.find('.projectTitle').value,
                    projectDesc: tmpl.find('.projectDesc').value,
                    projectLocation: tmpl.find('.projectLocation').value,
                    projectDepense: tmpl.find('.projectDepense').value,
                    projectDate: tmpl.find('.projectDate').value,
                    projectCover: downloadUrl,
                    attachedAction: curAction
                };

                if (curAction.budgetRestant < project.projectDepense) {
                    sAlert.error("Le budget dédié à l'action séléctionnée n'est pas suffisant!", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });
                } else {
                    //console.log('this is the project');
                    //console.log(project);
                    Meteor.call('updateProject', project, function (error, result) {
                        if (error) {
                            sAlert.error("Probleme lors de la sauvegarde, Veuillez contacter votre administrateur", {
                                effect: 'bouncyflip',
                                position: 'bottom',
                                timeout: 5000,
                                onRouteClose: false,
                                stack: false
                            });
                        } else {
                            sAlert.info("Sauvegarde Reussie", {
                                effect: 'bouncyflip',
                                position: 'bottom',
                                timeout: 3000,
                                onRouteClose: false,
                                stack: false
                            });
                        }
                    });
                    //console.log('save project done with the file');
                    Router.go('/projectList');
                }
            });
        } else {
            //console.log('updating without cover');
            var project = {
                _id: Session.get('curProjectId'),
                projectType: tmpl.find('#type').value,
                projectTitle: tmpl.find('.projectTitle').value,
                projectDesc: tmpl.find('.projectDesc').value,
                projectLocation: tmpl.find('.projectLocation').value,
                projectDepense: tmpl.find('.projectDepense').value,
                projectDate: tmpl.find('.projectDate').value,
                attachedAction: curAction
            };

            if (curAction.budgetRestant < project.projectDepense) {
                sAlert.error("Le budget dédié à l'action séléctionnée n'est pas suffisant!", {
                    effect: 'bouncyflip',
                    position: 'bottom',
                    timeout: 5000,
                    onRouteClose: false,
                    stack: false
                });
            } else {
                //console.log(project);
                Meteor.call('updateProject', project, function (error, result) {
                    if (error) {
                        sAlert.error("Erreur lors de l'update du projet, veuillez contacter votre administrateur", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });
                    } else {
                        sAlert.info("Update Reussie", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 3000,
                            onRouteClose: false,
                            stack: false
                        });
                    }
                });
                //console.log('save project done with the file');
                Router.go('/projectList');
            }
        }
    }
});

Template.regionForm.events({
    'change #action': function (evt, instance) {
        var actionId = $(evt.target).val();
        var action = Actions.findOne({_id: actionId});
        var actionDate = action.date;
        var actionLieu = action.lieux;
        $('.datetimepicker').val(actionDate);
        $('.projectLocation').val(actionLieu);
    }
});

Template.editProject.helpers({

    'currProjectObject': function () {
        return Projects.find({_id: Session.get('curProjectId')});
    },

    'currProjectPics': function () {
        return ProjectPictures.find({projectId: Session.get('curProjectId')}).fetch();
    },
    'currProjectFiles': function () {
        return ProjectFiles.find({projectId: Session.get('curProjectId')}).fetch();
    }
});

Template.regionForm.helpers({
    'actions': function () {
        return Actions.find({userId: Meteor.userId(), statut: 'Validé'}).fetch();
    },
    'selectedAction': function () {
        var project = Projects.findOne({_id: Session.get('curProjectId')});
        console.log('******************' + project.attachedAction._id);
        return project.attachedAction._id;
    },
    'currentActiviteType': function () {
        return Projects.findOne({_id: Session.get('curProjectId')}).projectType;
    }
});

Template.adminForm.helpers({
    'adminActions': function () {
        return Actions.find({statut: 'Validé'}).fetch();
    },
    'selectedAction': function () {
        var project = Projects.findOne({_id: Session.get('curProjectId')});
        console.log('******************' + project.attachedAction._id);
        return project.attachedAction._id;
    },
    'currentActiviteType': function () {
        return Projects.findOne({_id: Session.get('curProjectId')}).projectType;
    }
});


Template.addProjectModalPic.events({


    'click .uploadProjectPicture': function (evt, tmpl) {
        var file1 = $('input.file_bag1')[0].files[0];

        console.log('button upload picture is working');
        console.log(file1);


        if (file1) {
            uploader2.send(file1, function (error, downloadUrl) {
                var projectPicture = {
                    projectId: Session.get('curProjectId'),
                    projectPictureTitle: tmpl.find('.projectPictureTitle').value,
                    projectPictureDesc: tmpl.find('.projectPictureDesc').value,
                    projectPictureUrl: downloadUrl

                };

                if (error) {
                    sAlert.error("Probleme lors de l'upload de l'image", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });
                } else {
                    sAlert.info("Sauvegarde Reussie", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 3000,
                        onRouteClose: false,
                        stack: false
                    });
                    Meteor.call('saveProjectPicture', projectPicture);
                    console.log('save picture done');
                }

                console.log('this is the project picture');
                console.log(projectPicture);


                $('.projectPictureTitle').val('');
                $('.projectPictureDesc').val('');
                $('.removeData').val('');

            });
        } else {
            sAlert.error("Merci de choisir une image", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
        }


    }

});

Template.addProjectModalFile.events({


    'click .uploadProjectFile': function (evt, tmpl) {
        var file2 = $('input.file_bag3')[0].files[0];
        console.log(file2);
        console.log("Getting file is ok!");
        if (file2) {
            uploader3.send(file2, function (error, downloadUrl) {
                //console.log(uploader.progress());
                var projectFile = {
                    projectId: Session.get('curProjectId'),
                    projectFileTitle: tmpl.find('.projectFileTitle').value,
                    projectFileDesc: tmpl.find('.projectFileDesc').value,
                    projectFileUrl: downloadUrl
                };

                if (error) {
                    console.log(error);
                    sAlert.error("Probleme lors de l'upload du fichier", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    })
                } else {
                    sAlert.info("Upload Reussi", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 3000,
                        onRouteClose: false,
                        stack: false
                    });
                    Meteor.call('saveProjectFile', projectFile);
                    console.log('save file done');
                }

                console.log('this is the project file');
                console.log(projectFile);
                $('.projectFileTitle').val('');
                $('.projectFileDesc').val('');
            });

        } else {
            sAlert.error('Merci de selectionner un fichier', {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            })
        }
    }

});

Template.projectPicture.events({
    'click .delete-pic': function () {
        Meteor.call('remove', this._id);
    }
});
