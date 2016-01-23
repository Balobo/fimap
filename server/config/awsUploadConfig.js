/**
 * Created by yassine on 04/03/15.
 */

Slingshot.fileRestrictions("myFileUploads", {
    allowedFileTypes: null,
    //maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
    maxSize:null
});

Slingshot.createDirective("myFileUploads", Slingshot.S3Storage, {
    bucket: "yassbucketaws",

    acl: "public-read",

    authorize: function () {
        //Deny uploads if user is not logged in.
        if (!this.userId) {
            var message = "Please login before posting files";
            throw new Meteor.Error("Login Required", message);
        }

        return true;
    },

    key: function (file) {
        //Store file into a directory by the user's username.
        var user = Meteor.users.findOne(this.userId);
        return user.username + "/" + file.name;
    },
    AWSAccessKeyId: 'AKIAJNYWTDBDOGHXDYRA',
    AWSSecretAccessKey: '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',
    region:'eu-central-1'

});

Meteor.settings.S3Bucket = 'yassbucketaws';