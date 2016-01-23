/**
 * Created by HP on 16/12/2015.
 */
Template.depensesAr.helpers({
    'region': function () {
        return Regions.find().fetch();
    }
});

Template.depensesTable.helpers({
    'depensesList': function () {
        return Depenses.find({userType:'region', regionId:this._id});
    }
});