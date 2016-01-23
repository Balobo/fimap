/**
 * Created by ADMIN on 07/07/2015.
 */


Template.createAction.helpers({
    'anneeBudgets' : function(){
        var budgets = Budgets.find({regionId: Meteor.user().profile.region._id,statut:'Validé'}).fetch();
        console.log(budgets);
        return budgets;
    }
});

Template.createAction.events({

    'click .saveAction': function (evnt, tmpl) {
        var errorExit = null;
        var anneeBudg = Budgets.findOne({_id : tmpl.find('#anneeBudget').value});
        var action;
        if(anneeBudg){
            action = {
                titre: tmpl.find('#titre').value,
                anneeBudgetId:anneeBudg._id,
                anneeBudget : anneeBudg.annee,
                typeAction:tmpl.find('#type').value,
                budget: tmpl.find('#budget').value,
                budgetRestant : tmpl.find('#budget').value,
                lieux: tmpl.find('#lieux').value,
                date: tmpl.find('#date').value,
                desc: tmpl.find('#desc').value,
                adminRegion:Meteor.user(),
                userId:Meteor.userId(),
                regionId:Meteor.user().profile.region._id,
                region:Meteor.user().profile.region,
                statut:'Non Validé',
                realisation :'à effectuer'
            };
            if (!action.titre) {
                errorExit = true;
            }
            if (!action.budget) {
                errorExit = true;
            }
            if (!action.lieux) {
                errorExit = true;
            }
            if (!action.date) {
                errorExit = true;
            }
            if (!action.desc) {
                errorExit = true;
            }
        }else{
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
            Meteor.call('insertAction', action, function (error, result) {
                if (error) {
                    sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });
                } else {
                    sAlert.info("Sauvegarde de votre action Reussie", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 3000,
                        onRouteClose: false,
                        stack: false
                    });

                    Router.go('/actions');
                }
            });
        }


    }

});

Template.createAction.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
            locale: 'fr',
            format:'DD.MM.YYYY',
            defaultDate: new Date(),
            minDate: new Date(new Date().getFullYear(), 0, 1)
        }
    );
});
