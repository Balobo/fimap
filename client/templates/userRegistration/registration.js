/**
 * Created by yassine on 11/03/15.
 */
Template.registrationForm.events({

    'click .validRegistration': function (event, tmpl) {
        console.log('submitting form');

        var regionId = tmpl.find('#region').value;
        var region =  Regions.findOne({_id:regionId});

        var userToRegister = {
            username: tmpl.find('.login').value,
            email: tmpl.find('.email').value,
            password: tmpl.find('.password').value,
            profile: {
                region : region
            }
        };

        console.log(userToRegister);


        var errorExist = null;
        if (!userToRegister.username) {
            // error 1 : username doesent exist
            errorExist = 1;
        }
        if (!userToRegister.email) {
            // error 2 : email must be filed
            errorExist = 2;
        }

        if(tmpl.find('#code').value == 333){

        } else {
            if (!userToRegister.profile.region) {
                // error 2 : email must be filed
                errorExist = 3;
            }
        }


        if (errorExist) {
            var msg = null;

            if (errorExist == 1) {
                msg = 'Merci de rentrer un nom d utilisateur';
            }

            if (errorExist == 2) {
                msg = 'Merci de rentrer votre email';
            }

            if (errorExist == 3) {
                msg = 'Merci de choisir une region pour votre utilisateur ou bien de rentrer votre code administrateur';
            }

            sAlert.error(msg, {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });

        } else {


            console.log('this is the user we are registring');
            console.log(userToRegister);
            Accounts.createUser(userToRegister, function (error) {
                if (error) {
                    sAlert.error(error.message, {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });
                } else {
                    Router.go('/journal');
                }
            });
            console.log('usr created');
        }


    }
});

Template.registrationForm.helpers({

    regions: function(){
        return Regions.find().fetch();
    }

});