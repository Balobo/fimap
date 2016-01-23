/**
 * Created by ADMIN on 07/07/2015.
 */

Meteor.methods({
    'insertBudget': function (budget) {
        Budgets.insert(budget);
    },
    'removeBudget': function (id) {
        Budgets.remove({_id: id});
    },
    'updateBudget': function (budget) {

        Budgets.update({_id: budget._id}, {
            $set: {
                //region: budget.region,
                budget: budget.budget,
                reste: budget.reste,
                annee: budget.annee
            }
        });
    },
    'updateBudgetStatus': function (budget) {
        Budgets.update({_id: budget._id}, {
            $set: {
                statut: budget.statut
            }
        })
    },
    'updateBudgetDetails': function (budget) {
        Budgets.update({_id: budget._id}, {
            $set: {
                reste: budget.reste,
                depense: budget.depense
            }
        })
    },
    'addDepense': function (depense) {
        Depenses.insert(depense);
    },
    'editDepense': function (depense) {
        Depenses.update({_id: depense._id}, {
            $set: {
                typeDepense: depense.typeDepense,
                descriptionDepense: depense.descriptionDepense,
                dateDepense: depense.dateDepense,
                lieuDepense: depense.lieuDepense,
                montantDepense: depense.montantDepense,
                justificatifDepense: depense.justificatifDepense
            }
        });
    },
    'addBailleur': function (bailleur) {
        Bailleurs.insert(bailleur);
    },
    'editBailleur': function (bailleur) {
        Bailleurs.update({_id: bailleur._id}, {
            $set: {
                nomBailleur: bailleur.nomBailleur,
                descriptionBailleur: bailleur.descriptionBailleur,
                bailleurLocation: bailleur.bailleurLocation,
                justificatifBailleur: bailleur.justificatifBailleur
            }
        });
    },
    'removeBailleur': function (id) {
        Bailleurs.remove({_id: id});
    }
});