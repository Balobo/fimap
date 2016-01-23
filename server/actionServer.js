/**
 * Created by ADMIN on 07/07/2015.
 */

Meteor.methods({
    'insertAction':function(action){
        Actions.insert(action);
    },
    'removeAction':function(id){
        Actions.remove({_id:id});
    },
    'updateAction':function(action){

            Actions.update({_id: action._id}, {
                $set: {
                    typeAction:action.typeAction,
                    titre: action.titre,
                    budget: action.budget,
                    budgetRestant : action.budgetRestant,
                    lieux: action.lieux,
                    date: action.date,
                    desc: action.desc
                }
            });
    },
    'updateActionStatus':function(action){
        Actions.update({_id:action._id},{
            $set: {
                statut:action.statut
            }
        })
    },
    'updateActionRealisation':function(action){
        Actions.update({_id:action._id},{
            $set: {
                realisation :'realisée',
                budgetRestant : action.reste
            }
        })
    }

});