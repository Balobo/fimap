/**
 * Created by yassine on 05/03/15.
 */

Template.bureau.posts = function () {
    return Posts.find({userId: Meteor.userId(), parent: null}, {sort: {date: -1}});
};

Template.bureau.events({
    'keyup .posttext': function (evt, tmpl) {
        if (evt.which === 13) {
            var postText = tmpl.find('.posttext').value;
            var options =
            {
                type: 'post',
                text: postText,
                parent: null,
                username: Meteor.user().username,
                userId: Meteor.userId(),
                date: new Date(),
                attachedObject: null,
                postPicUrl: null
            };
            Meteor.call('addPost', options);
            $('.posttext').val("").select().focus();
        }
    }
})
