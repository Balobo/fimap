/**
 * Created by yassine on 11/03/15.
 */
Meteor.startup(function () {

    sAlert.config({
        effect: '',
        position: 'bottom',
        timeout: 5000,
        html: false,
        onRouteClose: true,
        stack: true,
        offset: 0
    });

});




Template.login.events({

    'click .loginButton , keypress .login , keypress .password' : function(evt,tmpl){
        if ((evt.type === 'click') || ( evt.charCode == 13) || ( evt.keyCode == 13)){
            console.log('setting the global show');
            console.log('trying the login');
            var user = tmpl.find('.login').value;
            var pass = tmpl.find('.password').value;


            Meteor.loginWithPassword(user,pass,function(error){
                if(error){
                    sAlert.error(error.message, {effect: 'bouncyflip', position: 'bottom', timeout: 3000, onRouteClose: false, stack: false});
                }else
                {
                    console.log('il passe aussi par le route');
                    Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.online":true}});
                    Router.go('/journal');
                }
            });
        }
    }

});


Template.homePage.events({

    'click .clickReg' : function(){
        console.log('setting the global show');
        Session.set('showHomePage',null);
    }



});