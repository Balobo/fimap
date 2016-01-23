/**
 * Created by ADMIN on 07/07/2015.
 */
var updateForm = function () {
    var curAction = Actions.findOne({_id: Session.get('curActionId')});
    console.log('this is the current project');
    console.log(curAction);
    $('#titre').val(curAction.titre);
    $('#budget').val(curAction.budget);
    $('#lieux').val(curAction.lieux);
    $('#date').val(curAction.date);
    $('#desc').val(curAction.desc);

    console.log('updating the form');

};

Template.editAction.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
            locale: 'fr',
            format:'DD.MM.YYYY'
        }
    );
});

Router.route('/actions/:_id', {
    name: 'editAction',
    onAfterAction: function () {
        Session.set('curActionId', this.params._id);
        console.log('Session have the id of action');
        updateForm();
    }
});

Template.editAction.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};


Template.editAction.events({

    'click .updateAction':function(evnt,tmpl){

        var errorExit = null;
        var currentAction = Actions.findOne({_id: Session.get('curActionId')});
        var action = {
            _id: Session.get('curActionId'),
            typeAction:tmpl.find('#type').value,
            titre: tmpl.find('#titre').value,
            budget: tmpl.find('#budget').value,
            budgetRestant : tmpl.find('#budget').value - (currentAction.budget - currentAction.budgetRestant),
            lieux: tmpl.find('#lieux').value,
            date: tmpl.find('#date').value,
            desc: tmpl.find('#desc').value
        };

        console.log(action);

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

        if (errorExit) {
            sAlert.error("Merci de renseigner les champs obligatoires", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
        } else {
            Meteor.call('updateAction', action, function (error, result) {
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

Template.editAction.helpers({
    'currentActionType':function(){
        return Actions.findOne({_id: Session.get('curActionId')}).typeAction;
    }
});