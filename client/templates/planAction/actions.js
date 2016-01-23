/**
 * Created by yassine on 05/06/15.
 */

Template.actions.helpers({

    actionsList: function () {
        return Actions.find({regionId: Meteor.user().profile.region._id, anneeBudgetId: this._id}).fetch();
    },
    inactifAction: function () {
        var today = new Date();
        var acitionDate = new Date(this.date.split('.')[2], this.date.split('.')[1] - 1, this.date.split('.')[0]);
        var dateDepasse = acitionDate.valueOf() < today.valueOf();
        var noActivity = true;
        var actionActivities = Projects.find({attachedActionId: this._id},{sort: {projectDate: -1}}).fetch();
        console.log(actionActivities);
        if(actionActivities.length > 0){
            noActivity = false;
        }
        return dateDepasse && noActivity;
    },
    actionsAdmin: function () {
        return Actions.find({anneeBudget: this.annee}).fetch();
    },
    'anneeBudget': function () {
        return Budgets.findOne({_id: this.anneeBudgetId}).annee;
    },
    'anneesBudgetaires': function () {
        return Budgets.find({statut: 'Validé', regionId: Meteor.user().profile.region._id}).fetch();
    },
    'anneesBudgetairesAdmin': function () {
        var data = Budgets.find({statut: 'Validé'}).fetch();
        var distinctBudgets = [];
        var distinctData = _.uniq(data, false, function(d) {return d.annee});
        var annees = _.pluck(distinctData, "annee");
        if(annees){
            for(var i=0; i<annees.length; i++){
                var budgetObj = Budgets.findOne({annee: annees[i]});
                distinctBudgets.push(budgetObj);
            }
        }
        return distinctBudgets;
        /*var anneesBudg = Budgets.find({statut: 'Validé'}).fetch();
        console.log(anneesBudg);
        var annneesDistinct = [];
        var exist = null;
        if (anneesBudg) {
            for (var i = 0; i < anneesBudg.length; i++) {
                if (i == 0) {
                    annneesDistinct.push(anneesBudg[i]);
                    console.log(anneesBudg[i]);
                } else {
                    for (var j = 0; j < annneesDistinct.length; j++) {
                        if (anneesBudg[i].annee == annneesDistinct[j].annee) {
                            exist = true;
                        }
                    }
                    if (!exist) {
                        console.log(anneesBudg[i]);
                        annneesDistinct.push(anneesBudg[i]);
                    }
                }
                /*
                if (annneesDistinct.length > 0) {
                    for (var j = 0; j < annneesDistinct.length; j++) {
                        if (anneesBudg[i].annee === annneesDistinct[j].annee) {
                            exist = true;
                        }
                    }
                    if (!exist) {
                        console.log('insert:' + anneesBudg[i].annee);
                        annneesDistinct.push(anneesBudg[i]);
                    }
                } else {
                    console.log('1st insert:' + anneesBudg[i].annee);
                    //annneesDistinct.push(anneesBudg[i]);
                }*//*
            }
        }
        /*console.log(annneesDistinct);
        return annneesDistinct;*/
    },
    'coutTotalActionsParBudget': function () {
        var actions = Actions.find({
            regionId: Meteor.user().profile.region._id,
            anneeBudgetId: this._id,
            statut: 'Validé'
        }).fetch();
        var coutTotal = 0;
        if (actions) {
            for (var i = 0; i < actions.length; i++) {
                coutTotal -= (0 - actions[i].budget);
            }
        }
        return coutTotal;
    },
    'depassement': function () {
        var actions = Actions.find({
            regionId: Meteor.user().profile.region._id,
            anneeBudgetId: this._id,
            statut: 'Validé'
        }).fetch();
        var coutTotal = 0;
        if (actions) {
            for (var i = 0; i < actions.length; i++) {
                coutTotal -= (0 - actions[i].budget);
            }
        }
        if (coutTotal > this.budget) {
            return true;
        } else {
            return null;
        }
    },
    'coutTotalActionsParBudgetAdmin': function () {
        var actions = Actions.find({anneeBudget: this.annee, statut: 'Validé'}).fetch();
        var coutTotal = 0;
        if (actions) {
            for (var i = 0; i < actions.length; i++) {
                coutTotal -= (0 - actions[i].budget);
            }
        }
        return coutTotal;
    },
    'depassementAdmin': function () {
        var actions = Actions.find({anneeBudget: this.annee, statut: 'Validé'}).fetch();
        var coutTotal = 0;
        var budgets = Budgets.find({annee: this.annee}).fetch();
        var budgetTotal = 0;
        if (budgets) {
            for (var i = 0; i < budgets.length; i++) {
                budgetTotal -= (0 - budgets[i].budget);
            }
        }
        if (actions) {
            for (var i = 0; i < actions.length; i++) {
                coutTotal -= (0 - actions[i].budget);
            }
        }
        if (coutTotal > budgetTotal) {
            return true;
        } else {
            return null;
        }
    },
    'budgetTotalAdmin': function () {
        var budgets = Budgets.find({annee: this.annee}).fetch();
        var budgetTotal = 0;
        if (budgets) {
            for (var i = 0; i < budgets.length; i++) {
                budgetTotal -= (0 - budgets[i].budget);
            }
        }
        return budgetTotal;
    }

});


Template.actions.events({

    'click .removeAction': function (evnt, tmpl) {
        console.log('we are on the remove of action');
        if (tmpl.find('#testRemove').value) {
            return;
        } else {
            Meteor.call('removeAction', this._id);
        }

    }

});
