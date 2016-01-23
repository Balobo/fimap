var uploader6 = new Slingshot.Upload("myFileUploads");

Slingshot.fileRestrictions("myFileUploads", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/gif", "application/pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
    maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
});

Template.journal.posts = function () {
    return Posts.find({parent: null}, {sort: {date: -1}});
};

Template.progressBar6.helpers({
    progress: function () {
        console.log(uploader6.progress());
        return Math.round(uploader6.progress() * 100);
    }
});


Template.journal.events({
    'keyup .posttext': function (evt, tmpl) {
        if (evt.which === 13) {
            var posttext = tmpl.find('.posttext').value;
            var options =
            {
                text: posttext, parent: null, username: Meteor.user().username,
                userId: Meteor.userId(), profileCover: Meteor.user().profile.cover, date: new Date()
            };
            Meteor.call('addPost', options);
            $('.posttext').val("").select().focus();
        }
    },
    'click .submitPost': function (evt, tmpl) {
        var posttext = tmpl.find('.posttext').value;
        // TODO : regler le profile cover
        var options =
        {
            text: posttext, parent: null, username: Meteor.user().username,
            userId: Meteor.userId(), profileCover: Meteor.user().profile.cover, date: new Date()
        };
        Meteor.call('addPost', options);

    }
});

Template.journalPicModal.events({

    'click .sharePostPicture': function (evnt, tmpl) {

        var postText = tmpl.find('.postPicStatus').value;
        var files = $('input.file_bag')[0].files[0];

        if (files) {
            uploader6.send(files, function (error, downloadUrl) {
                // TODO : regler le profile cover
                var options = {
                    type: 'post',
                    text: postText,
                    parent: null,
                    username: Meteor.user().username,
                    userId: Meteor.userId(),
                    date: new Date(),
                    attachedObject: null,
                    postPicUrl: downloadUrl
                };
                console.log(error);
                console.log(options);

                if (error) {
                    sAlert.error("Upload de l'image n'a pas reussi", {
                        effect: 'bouncyflip',
                        position: 'top-right',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });

                } else {
                    Meteor.call('addPost', options);
                    console.log('add post with pic done');
                }
            });
        } else {
            sAlert.error("Merci de choisir une image", {
                effect: 'bouncyflip',
                position: 'top-right',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
        }

        $('.postPicStatus').val("").select().focus();
        $('.file_bag').val(null).select().focus();


    }

});