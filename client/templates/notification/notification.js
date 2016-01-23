/**
 * Created by HP on 14/06/2015.
 */

Template.notification.events({

    'click .saveNotification': function (evnt, tmpl) {

        var errorExit = null;
        var notif = {
            notifDesc: tmpl.find('#notifDesc').value,
            notifType: tmpl.find('#notifType').value,
            notifDegree: tmpl.find('#notifDegree').value,
            notifDate: new Date(),
            notifUser:Meteor.user(),
            notifUserId:Meteor.userId()
        };

        console.log(notif);

        if (!notif.notifDesc) {
            errorExit = true;
        }


        if (errorExit) {
            sAlert.error("Merci de renseigner la description de la notification", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
        } else {
            Meteor.call('saveNotif', notif, function (error, result) {
                if (error) {
                    sAlert.error("Merci de renseigner la description de la notification", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });
                } else {
                    sAlert.info("Notification envoyée avec succes", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 3000,
                        onRouteClose: false,
                        stack: false
                    });

                    Router.go('/journal');

                }

            });
        }


    }

});