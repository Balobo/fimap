/**
 * Created by yassine on 14/05/15.
 */
Template.projectList.events({});

Template.projectView.events({

    'click .removeProject': function (evnt, tmpl) {
        if (tmpl.find('#testRemove').value) {
            return;
        } else {
            var project = Projects.findOne({_id: this._id});
            var projectAction = Actions.findOne({_id: project.attachedActionId});

            Meteor.call('removeProjectServer', this._id, function (error, result) {
                if (error) {
                    sAlert.error("Probleme lors de la suppression de votre activité, Veuillez contacter votre administrateur", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });
                } else {
                    //Update Budget Restant de l'action
                    var newReste = projectAction.budgetRestant - (0 - project.projectDepense);
                    var actionToUpdate = {
                        _id: projectAction._id,
                        reste: newReste
                    };
                    Meteor.call('updateActionRealisation', actionToUpdate);


                    var regionBudget = Budgets.findOne({regionId: Meteor.user().profile.region._id});
                    var newBudgReste = regionBudget.reste - (0 - project.projectDepense);
                    var newDepenses = regionBudget.depense - project.projectDepense;
                    var budgetUpdate = {
                        _id: regionBudget._id,
                        reste: newBudgReste,
                        depense: newDepenses
                    };
                    Meteor.call('updateBudgetDetails', budgetUpdate);


                    sAlert.info("Sauvegarde Reussie", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 3000,
                        onRouteClose: false,
                        stack: false
                    });
                }
            });
            //Meteor.call('removeProjectServer',this._id);
        }
    }

});


Template.projectList.helpers({
    'projectArray': function () {
        return Projects.find({regionId: Meteor.user().profile.region._id}, {sort: {projectDate: -1}});
    },
    'adminProjects': function () {
        var projects = Projects.find({}, {sort: {projectDate: -1}}).fetch();
        console.log(projects.length);
        return projects;
    }
});

Template.adminProjectsView.helpers({
    'region': function () {
        return Regions.find().fetch();
    },
    'activites':function(){
        return Projects.find({regionId: this._id}, {sort: {projectDate: -1}}).fetch();
    },
    'projectsCount':function(){
        return Projects.find({regionId: this._id}, {sort: {projectDate: -1}}).count();
    }
});