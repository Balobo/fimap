/**
 * Created by HP on 16/12/2015.
 */

Template.bailleur.helpers({
    bailleurList: function () {
        return Bailleurs.find();
    }
});