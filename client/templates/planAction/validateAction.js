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

Router.route('/actionsValidations/:_id', {
    name: 'validateAction',
    onAfterAction: function () {
        Session.set('curActionId', this.params._id);
        console.log('Session have the id of action');
        updateForm();
    }
});

Template.validateAction.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};


Template.validateAction.events({

    'click .validateAction': function (evnt, tmpl) {

        var action = {
            _id: Session.get('curActionId'),
            statut: 'Validé'
        };

        console.log(action);

        Meteor.call('updateActionStatus', action, function (error, result) {
            if (error) {
                sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                    effect: 'bouncyflip',
                    position: 'bottom',
                    timeout: 5000,
                    onRouteClose: false,
                    stack: false
                });
            } else {
                sAlert.info("Votre action est validee", {
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
});

Template.validateAction.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
            locale: 'fr',
            format:'DD.MM.YYYY',
            defaultDate: new Date()
        }
    );
});