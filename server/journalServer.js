//Meteor.publish("posts",function(userid){
//	return Posts.find({});
//});
//Meteor.publish("likes",function(postid){
//	return Likes.find({post:postid});
//});
//Meteor.publish("appusers",function(){
//	return Meteor.users.find();
//});

Meteor.methods({
	//{text:'',owner:'',date:'',parent:''}
	'addPost':function(options){

		Posts.insert(options);
	},
	'removePost':function(id){
		Posts.remove({_id:id});
	},
	'removeAllPosts':function(){
		Posts.remove({});
	},
    'insertPostsLikes':function(like){
        PostsLikes.insert(like);
    }
});
