/**
 * Created by yassine on 05/06/15.
 */

Template.budgets.helpers({

    budgetsList: function () {
        if(Meteor.user().profile.region){
            var regionId = Meteor.user().profile.region._id;
            return Budgets.find({regionId:regionId}).fetch();
        } else {
            return null;
        }

    },
    budgetsListAdmin : function(){
        var adminBudgets = Budgets.find({}).fetch();
        //console.log(adminBudgets);
        return adminBudgets;
    }


});


Template.budgets.events({

    'click .removeBudget': function (evnt,tmpl) {
        console.log('we are on the remove of budget');
        if(tmpl.find('#testRemove').value){
            return;
        } else{
            Meteor.call('removeBudget', this._id);
        }

    },
    'click .validateBudget':function() {

        var budget = {
            _id: this._id,
            statut: 'Validé'
        };

        console.log(budget);

        Meteor.call('updateBudgetStatus', budget, function (error, result) {
            if (error) {
                sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                    effect: 'bouncyflip',
                    position: 'bottom',
                    timeout: 5000,
                    onRouteClose: false,
                    stack: false
                });
            } else {
                sAlert.info("Votre Budget est validee", {
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

});
