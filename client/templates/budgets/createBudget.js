/**
 * Created by ADMIN on 07/07/2015.
 */

Template.createBudget.events({

    'click .saveBudget': function (evnt, tmpl) {


        var errorExit = null;
        var budget = {
            annee: tmpl.find('#annee').value,
            regionId: Meteor.user().profile.region._id,
            region: Meteor.user().profile.region,
            budget: tmpl.find('#budget').value,
            reste: tmpl.find('#budget').value,
            depense: 0,
            statut: 'non validé',
            adminRegion: Meteor.user()
        };


        if (!budget.annee) {
            errorExit = true;
        }

        if (!budget.budget) {
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

            var budgetExistsEroor = null;
            var existing_budgets = Budgets.find({regionId: Meteor.user().profile.region._id}).fetch();

            for (var i = 0; i < existing_budgets.length; i++) {
                if(budget.annee === existing_budgets[i].annee){
                    budgetExistsEroor = true
                }
            }

            if(budgetExistsEroor){
                sAlert.error("Vous avez déja créé un budget pour l'année "+ budget.annee, {
                    effect: 'bouncyflip',
                    position: 'bottom',
                    timeout: 5000,
                    onRouteClose: false,
                    stack: false
                });
            } else {
                Meteor.call('insertBudget', budget, function (error, result) {
                        if (error) {
                            sAlert.error("Une Erreur s'est produite lors de la création du budget, veuillez contacter votre administrateur", {
                                effect: 'bouncyflip',
                                position: 'bottom',
                                timeout: 5000,
                                onRouteClose: false,
                                stack: false
                            });

                        }
                        else {
                            sAlert.info("Sauvegarde de votre budget Reussie", {
                                effect: 'bouncyflip',
                                position: 'bottom',
                                timeout: 3000,
                                onRouteClose: false,
                                stack: false
                            });

                            Router.go('/budgets');
                        }
                    }
                )
                ;
            }

        }


    }

});


Template.createBudget.helpers({
    regions: function () {
        return Regions.find().fetch();
    }
});
