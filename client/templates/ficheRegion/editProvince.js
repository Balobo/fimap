/**
 * Created by ADMIN on 07/07/2015.
 */
var updateForm = function () {
    var curProvince = Provinces.findOne({_id: Session.get('curProvinceId')});
    $('#nom').val(curProvince.nom);
    $('#codeProvince').val(curProvince.codeProvince);

};

Router.route('/province/:_id', {
    name: 'editProvince',
    onAfterAction: function () {
        Session.set('curProvinceId', this.params._id);
        console.log('Session have the id of province');
        updateForm();
    }
});

Template.editProvince.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};


Template.editProvince.events({

    'click .updateProvince':function(evnt,tmpl){

        var errorExit = null;
        var province = {
            _id: Session.get('curProvinceId'),
            nom: tmpl.find('#nom').value,
            codeProvince: tmpl.find('#codeProvince').value
        };

        if (!province.nom) {
            errorExit = true;
        }
        if (!province.codeProvince) {
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
            Meteor.call('updateProvince', province, function (error, result) {
                if (error) {
                    sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 5000,
                        onRouteClose: false,
                        stack: false
                    });
                } else {
                    sAlert.info("update reussi de votre province", {
                        effect: 'bouncyflip',
                        position: 'bottom',
                        timeout: 3000,
                        onRouteClose: false,
                        stack: false
                    });


                    var reg = Provinces.findOne({_id:Session.get('curProvinceId')});
                    Router.go('/regions/'+reg.regionId);
                }
            });
        }

    }

});

Template.createCommune.events({

    'click .valider':function(evnt , tmpl){
        var commune = {
            provinceId:Session.get('curProvinceId'),
            nom: tmpl.find('#commune').value
        };

        if(commune.nom){
            Meteor.call('insertCommune',commune);
            $('#commune').val('');
        } else {
            sAlert.error("Merci de saisir un nom pour votre commune", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
        }
    },
    'click .removeCommune': function (){
        Meteor.call('removeCommune', this._id);
    }

});


Template.createCommune.helpers({

    communes: function(){
        return Communes.find({provinceId:Session.get('curProvinceId')}).fetch();
    }

});

