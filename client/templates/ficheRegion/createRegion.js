/**
 * Created by ADMIN on 07/07/2015.
 */

Template.createRegion.events({

    'click .saveRegion': function (evnt, tmpl) {


        var errorExit = null;
        var region = {
            nom: tmpl.find('#nom').value,
            desc: tmpl.find('#desc').value,
            admin: 'fimap'
        };

        console.log(region);

        if (!region.nom) {
            errorExit = true;
        }

        if (!region.desc) {
            errorExit = true;
        }

        if (errorExit) {
            sAlert.error("Merci de renseigner les champs obligatoires", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
        } else {
            Meteor.call('insertRegion', region, function (error, result) {
                    if (error) {
                        sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });

                    }
                    else {
                        sAlert.info("Sauvegarde de votre region Reussie", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 3000,
                            onRouteClose: false,
                            stack: false
                        });

                        Router.go('/regions');
                    }
                }
            )
            ;
        }


    }

})
;
