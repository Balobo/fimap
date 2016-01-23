/**
 * Created by HP on 07/12/2015.
 */
var uploaderBiblio = new Slingshot.Upload("myFileUploads");

Template.bibliotheque.helpers({
    documents: function () {
        return DocumentsBiblio.find().fetch();
    }
});

Template.bibliotheque.events({
    'click .removeDoc': function (evnt,tmpl) {
        if(tmpl.find('#testRemove').value){
            return;
        } else{
            Meteor.call('removeDocument', this._id);
        }
    }
});

Template.progressBarBiblio.helpers({
    progress: function () {
        console.log(uploaderBiblio.progress());
        return Math.round(uploaderBiblio.progress() * 100);
    }
});

Template.documentModal.events({
    'click .uploadFile': function (evnt, tmpl) {
        if (Meteor.user()) {
            var file = $('input.file_bag')[0].files[0];
            var fileTitle = tmpl.find('.fileTitle').value;
            if (file) {
                uploaderBiblio.send(file, function (error, downloadUrl) {
                    if (error) {
                        sAlert.error("Erreur lors de l'envoi du fichier. Veuillez contacter votre administrateur!", {
                            effect: 'bouncyflip',
                            position: 'top-right',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });

                    } else {
                        var document = {
                            file: downloadUrl,
                            fileTitle: fileTitle,
                            userId: Meteor.userId()
                        };
                        Meteor.call('addDocument', document, function (error, result) {
                                if (error) {
                                    sAlert.error("Une Erreur s'est produite lors de la création du document, Veuillez contacter votre administrateur", {
                                        effect: 'bouncyflip',
                                        position: 'bottom',
                                        timeout: 5000,
                                        onRouteClose: false,
                                        stack: false
                                    });

                                }
                                else {
                                    sAlert.info("Sauvegarde de votre document Reussie", {
                                        effect: 'bouncyflip',
                                        position: 'bottom',
                                        timeout: 3000,
                                        onRouteClose: false,
                                        stack: false
                                    });
                                }
                            }
                        );
                    }
                });
            } else {
                sAlert.error("Merci de choisir un fichier", {
                    effect: 'bouncyflip',
                    position: 'top-right',
                    timeout: 5000,
                    onRouteClose: false,
                    stack: false
                });
            }
            $('.fileTitle').val('');
            $('.file_bag').val('');
        }
        else {
            alert("login to chat");
        }
    }
});