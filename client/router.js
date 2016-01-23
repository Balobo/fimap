Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
    autoRender:true,
    progress : true,
    progressTick : false
});
Router.map(function() {
  	this.route('/login',
        {path: '/',
        onAfterAction : function(){
           console.log('we are runing the after action');
            if(Meteor.userId()){
                Session.set('showHomePage', null);

            }else{
                Session.set('showHomePage', true);
            }

        }});
    this.route('bureau');
    this.route('pageBudgets');
    this.route('budgetFimap');
    this.route('depensesAr');
    this.route('depensesInternes');
    this.route('createDepense');
    this.route('bibliotheque');
    this.route('createActivity');
    this.route('projectList');
    this.route('projectSearch');
    this.route('journal');
    this.route('gallerie');
    this.route('registrationForm');
    this.route('reportings');
    this.route('chat');
    this.route('statistics');
    this.route('adherents');
    this.route('comptabilite');
    this.route('notification');
    this.route('actionActivites');
    this.route('createProject');
    this.route('createAdhe');
    this.route('notificationList');
    this.route('createRegion');
    this.route('regionList');
    this.route('regions');
    this.route('actions');
    this.route('createAction');
    this.route('budgets');
    this.route('createBudget');
    this.route('createBailleur');
    this.route('createFond');
});



