/**
 * Created by ADMIN on 07/07/2015.
 */
var updateForm = function () {
    var curBudget = Budgets.findOne({_id: Session.get('curBudgetId')});
    console.log('this is the current project');
    console.log(curBudget);
    $('#test').val(curBudget.region);
    $('#budget').val(curBudget.budget);
    $('#annee').val(curBudget.annee);

    console.log('updating the form');

};

Router.route('/validateBudget/:_id', {
    name: 'validateBudget',
    onAfterAction: function () {
        Session.set('curBudgetId', this.params._id);
        console.log('Session have the id of action');
        updateForm();
    }
});

Template.validateBudget.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};


Template.validateBudget.events({

    'click .validateBudget':function() {

        var budget = {
            _id: Session.get('curBudgetId'),
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

Template.validateBudget.helpers({
    selectedRegion: function(){
        var curBudget = Budgets.findOne({_id: Session.get('curBudgetId')});

        return curBudget.region;
    },
    selectedYear: function(){
        var curBudget = Budgets.findOne({_id: Session.get('curBudgetId')});

        return curBudget.annee;
    }
});

