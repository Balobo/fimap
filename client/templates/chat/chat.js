/**
 * Created by yassine on 20/05/15.
 */
var uploaderChat = new Slingshot.Upload("myFileUploads");

Template.chat.onRendered(function () {
    //var userId = Meteor.users.findOne()._id;
    //var res = ChatRooms.findOne();
    //Session.set("roomid", res._id);
});

Template.sidebarChat.onRendered(function () {
    $('.list-group li:first').addClass('active');
    var res = ChatRooms.findOne({chatIds: {$all: [Session.get('firstConvUserId'), Meteor.userId()]}});
    if (res) {
        //already room exists
        Session.set("roomid", res._id);
    }
    else {
        //no room exists
        var newRoom = ChatRooms.insert({chatIds: [Session.get('firstConvUserId'), Meteor.userId()], messages: []});
        Session.set('roomid', newRoom);
    }
   /* var userId = ChatRooms.findOne({_id: Session.get('roomid')}).chatIds;
    console.log(userId);
    $('#'+userId).addClass('active');*/
    /*var d = Document.getElementById(userId);
    d.className = d.className + " active";*/
});

Template.sidebarChat.helpers({
    'onlusr': function () {
        var onlineUsers = Meteor.users.find({"profile.online": true}).fetch();

        for (var i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i]._id == Meteor.userId()) {
                onlineUsers.splice(i, 1);
            }
        }

        return onlineUsers;
    },
    'allUsers': function () {
        var allUsers = Meteor.users.find().fetch();
        for (var i = 0; i < allUsers.length; i++) {
            if (allUsers[i]._id == Meteor.userId()) {
                allUsers.splice(i, 1);
            }
        }
        Session.set("firstConvUserId", allUsers[0]._id);
        console.log(allUsers[0]);
        return allUsers;
    },
    'conversationArchives': function () {
        var convHis = ChatRooms.find({chatIds: ['%', Meteor.userId()]}).fetch();
        return convHis;
    }
});

Template.sidebarChat.events({
    'click .user': function () {
        Session.set('currentId', this._id);
        var res = ChatRooms.findOne({chatIds: {$all: [this._id, Meteor.userId()]}});
        if (res) {
            //already room exists
            Session.set("roomid", res._id);
        }
        else {
            //no room exists
            var newRoom = ChatRooms.insert({chatIds: [this._id, Meteor.userId()], messages: []});
            Session.set('roomid', newRoom);
        }
    }
});

Template.chatMessages.helpers({
    'msgs': function () {
        var result = ChatRooms.findOne({_id: Session.get('roomid')});
        return result.messages.reverse();
    },
    'isMsgOwner': function () {
        if (this.userId === Meteor.userId()) {
            return true;
        } else {
            return null;
        }
    }
});

Template.chatInput.events = {
    'keydown input#message, click .sendChat': function (event) {
        if (event.type === 'click' || event.which == 13) {
            if (Meteor.user()) {
                var name = Meteor.user().username;
                var userId = Meteor.userId();
                var message = document.getElementById('message');

                if (message.value !== '') {
                    var de = ChatRooms.update({"_id": Session.get("roomid")}, {
                        $push: {
                            messages: {
                                name: name,
                                userId: userId,
                                text: message.value,
                                file:null,
                                fileTitle:null,
                                createdAt: new Date()
                            }
                        }
                    });
                    document.getElementById('message').value = '';
                    message.value = '';
                }

                $('#message').val("").select().focus();
            }
            else {
                alert("login to chat");
            }

        }
    }
};

Template.progressBarChat.helpers({
    progress: function () {
        console.log(uploaderChat.progress());
        return Math.round(uploaderChat.progress() * 100);
    }
});

Template.chatDocumentModal.events({
    'click .shareChatFile': function (evnt, tmpl) {
        if (Meteor.user()) {
            var name = Meteor.user().username;
            var userId = Meteor.userId();
            var message = null;
            var file = $('input.file_bag')[0].files[0];
            var fileTitle = tmpl.find('.chatFileTitle').value;
            console.log(name + ' ' + userId + ' ' + message + ' ' + file);
            if (file) {
                uploaderChat.send(file, function (error, downloadUrl) {
                    if (error) {
                        sAlert.error("Erreur lors de l'envoi du fichier. Veuillez contacter votre administrateur!", {
                            effect: 'bouncyflip',
                            position: 'top-right',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });

                    } else {
                        console.log(downloadUrl);
                        var de = ChatRooms.update({"_id": Session.get("roomid")}, {
                            $push: {
                                messages: {
                                    name: name,
                                    userId: userId,
                                    text: null,
                                    file:downloadUrl,
                                    fileTitle:fileTitle,
                                    createdAt: new Date()
                                }
                            }
                        });
                        /*
                        document.getElementById('chatFileComment').value = '';
                        message.value = '';*/
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
        }
        else {
            alert("login to chat");
        }
    }
});