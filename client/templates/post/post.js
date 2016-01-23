Template.registerHelper('formatDate', function (date) {
    return moment(date).format('DD-MM-YYYY');
});

Template.post.helpers({
    'likeCount': function () {
        return PostsLikes.find({post: this._id}).count();
    },
    'postComments': function () {
        return Posts.find({parent: this._id});
    },
    'likeThis': function () {
        var curlike = PostsLikes.findOne({postLikeOwner: Meteor.userId(), post: this._id});
        if (curlike)
            return 'Vous approuvez!';
    },
    'isActivite': function () {
        if (this.type === 'activite') {
            return true;
        } else {
            return null;
        }
    },
    'attachedObjectType': function(){
        return Projects.findOne({_id:this.attachedObject}).projectType;
    }
});

Template.post.events({
    'keyup .comment': function (evt, tmpl) {
        if (evt.which === 13) {
            var commentText = tmpl.find('.comment').value;
            var options =
            {
                type: 'comment',
                text: commentText,
                parent: this._id,
                username: Meteor.user().username,
                userId: Meteor.userId(),
                date: new Date(),
                attachedObject: null
            };
            Meteor.call('addPost', options);
            $('.comment').val('');
            $('.posttext').select().focus();
        }
    },
    'click .likePost': function () {
        var curlike = PostsLikes.findOne({postLikeOwner: Meteor.userId(), post: this._id});
        if (!curlike) {
            var like = {postLikeOwner: Meteor.userId(), post: this._id};
            Meteor.call('insertPostsLikes', like);

        }
    }


});

