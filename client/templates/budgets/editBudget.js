/**
 * Created by ADMIN on 07/07/2015.
 */
var updateForm = function () {
    var curBudget = Budgets.findOne({_id: Session.get('curBudgetId')});
    console.log('this is the current project');
    console.log(curBudget);
    $('#budget').val(curBudget.budget);
    $('#annee').val(curBudget.annee);
    console.log('updating the form');

};

Router.route('/budgets/:_id', {
    name: 'editBudget',
    onAfterAction: function () {
        Session.set('curBudgetId', this.params._id);
        console.log('Session have the id of action');
        updateForm();
    }
});

Template.editBudget.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};


Template.editBudget.events({

    'click .updateBudget':function(evnt,tmpl){

        var errorExit = null;
        var budgetInitial = Budgets.findOne({_id:Session.get('curBudgetId')});
        var reste = ((tmpl.find('#budget').value - budgetInitial.budget) - (0 - budgetInitial.reste));

        var budget = {
            _id: Session.get('curBudgetId'),
            budget: tmpl.find('#budget').value,
            reste: reste,
            annee: tmpl.find('#annee').value
        };

        console.log(budget);

        if (!budget.budget) {
            errorExit = true;
        }
        if (!budget.annee) {
            errorExit = true;
        }

        if(budgetInitial.statut === 'Validé'){
            sAlert.error("Vous ne pouvez pas modifier un budget validé par la FIMAP", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
            Router.go('/budgets');
        }else if (errorExit) {
            sAlert.error("Merci de renseigner les champs obligatoires", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
        } else {
            Meteor.call('updateBudget', budget, function (error, result) {
                if (error) {
                    sAlert.error("Une Erreur s'est produite lors de la modification du budget, veuillez contacter votre administrateur", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });
                } else {
                    sAlert.info("Mise à jour de votre budget Reussie", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 3000,
                        onRouteClose: false,
                        stack: false
                    });

                    Router.go('/budgets');
                }
            });
        }

    }

});

Template.editBudget.helpers({
    selectedYear: function(){
        /*var curBudget = Budgets.findOne({_id: Session.get('curBudgetId')});

        return curBudget.annee;*/
        return Budgets.findOne({_id: Session.get('curBudgetId')});
    }
});

