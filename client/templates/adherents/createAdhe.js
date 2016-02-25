/**
 * Created by ADMIN on 07/07/2015.
 */

var uploader4 = new Slingshot.Upload("myFileUploads");

Template.createAdhe.onRendered(function () {
    this.$('.datetimepicker2').datetimepicker({
            locale: 'fr',
            format: 'DD.MM.YYYY'
        }
    );
});

Template.createAdhe.created = function() {
    this.selectedProvince = new ReactiveVar(null);
};


Template.createAdhe.events({

    'click .saveAdhe': function (evnt, tmpl) {

        var errorExit = null;

        var files = $('input.file_bag')[0].files[0];

        var radioValue;
        if (document.getElementById('hommeRadio').checked) {
            radioValue = document.getElementById('hommeRadio').value;
        }else if(document.getElementById('femmeRadio').checked){
            radioValue = document.getElementById('femmeRadio').value;
        }else{
            errorExit = true;
        }

        var nbreRuchesSah = tmpl.find('#nbrRuchesSah').value ? tmpl.find('#nbrRuchesSah').value : 0;
        var nbreRuchesNoire = tmpl.find('#nbrRuchesNoires').value ?tmpl.find('#nbrRuchesNoires').value : 0;
        var nbreRuches = nbreRuchesSah - (0- nbreRuchesNoire) ;

        var adherent = {
            prenom: tmpl.find('#prenom').value,
            nom: tmpl.find('#nomFamille').value,
            cin: tmpl.find('#cin').value,
            dateNaissance: tmpl.find('#dateNaissance').value,
            sexe : radioValue,
            tel: tmpl.find('#tel').value,
            email: tmpl.find('#email').value,
            numEnreg: tmpl.find('#numEnreg').value,
            cps: tmpl.find('#cps').value,
            adherent: tmpl.find('#adherent').value,
            regionId: Meteor.user().profile.region._id,
            region: Meteor.user().profile.region,
            province: tmpl.find('#province').value,
            commune: tmpl.find('#commune').value,
            ville: tmpl.find('#ville').value,
            adresse: tmpl.find('#adresse').value,
            nombreRuches: nbreRuches,
            NombreRuchesNoires : nbreRuchesNoire,
            NombreRuchesSahariennes : nbreRuchesSah,
            numRecu: tmpl.find('#numRecu').value,
            montantCotisation: tmpl.find('#montantCotisation').value,
            adminRegion: Meteor.userId(),
            commentaire : tmpl.find('#commentaire').value
        };

        console.log(adherent);

        if (!adherent.prenom) {
            errorExit = true;
        }
        if (!adherent.nom) {
            errorExit = true;
        }

        if (!adherent.ville) {
            errorExit = true;
        }
        if (!adherent.cin) {
            errorExit = true;
        }
        if (!adherent.nombreRuches) {
            errorExit = true;
        }
        if (!adherent.numEnreg) {
            errorExit = true;
        }
        if (!adherent.cps) {
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

            if (files) {

                uploader4.send(files, function (error, downloadUrl) {

                    var adherent = {
                        prenom: tmpl.find('#prenom').value,
                        nom: tmpl.find('#nomFamille').value,
                        cin: tmpl.find('#cin').value,
                        dateNaissance: tmpl.find('#dateNaissance').value,
                        sexe : radioValue,
                        tel: tmpl.find('#tel').value,
                        email: tmpl.find('#email').value,
                        numEnreg: tmpl.find('#numEnreg').value,
                        cps: tmpl.find('#cps').value,
                        adherent: tmpl.find('#adherent').value,
                        regionId: Meteor.user().profile.region._id,
                        region: Meteor.user().profile.region,
                        province: tmpl.find('#province').value,
                        commune: tmpl.find('#commune').value,
                        ville: tmpl.find('#ville').value,
                        adresse: tmpl.find('#adresse').value,
                        nombreRuches: nbreRuches,
                        NombreRuchesNoires : nbreRuchesNoire,
                        NombreRuchesSahariennes : nbreRuchesSah,
                        adminRegion: Meteor.userId(),
                        profilePic : downloadUrl,
                        commentaire : tmpl.find('#commentaire').value
                    };

                    Meteor.call('insertAdherent', adherent, function (error, result) {
                        if (error) {
                            sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                                effect: 'bouncyflip',
                                position: 'bottom',
                                timeout: 5000,
                                onRouteClose: false,
                                stack: false
                            });
                        } else {
                            sAlert.info("Sauvegarde de votre adherent Reussie", {
                                effect: 'bouncyflip',
                                position: 'bottom',
                                timeout: 3000,
                                onRouteClose: false,
                                stack: false
                            });

                            Router.go('/adherents');
                        }
                    });
                });
            } else {

                Meteor.call('insertAdherent', adherent, function (error, result) {
                    if (error) {
                        sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });
                    } else {
                        sAlert.info("Sauvegarde de votre adherent Reussie", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 3000,
                            onRouteClose: false,
                            stack: false
                        });

                        Router.go('/adherents');
                    }
                });

            }
        }


    },
    'change #province':function(evt,instance){
        var provinceId = $(evt.target).val();
        var codeProvince = Provinces.findOne({_id: provinceId}).codeProvince;
        document.getElementById("cps").value = codeProvince;
        instance.selectedProvince.set(provinceId);
    }

});

Template.progressBar4.helpers({
    progress: function () {
        return Math.round(uploader4.progress() * 100);
    }
});


Template.createAdhe.helpers({
    villes: function(){
        return Villes.find({regionId: Meteor.user().profile.region._id}).fetch();
    },
    provinces: function(){
        return Provinces.find({regionId:Meteor.user().profile.region._id}).fetch();
    },
    communes: function(){
        var selectedProvinceId = Template.instance().selectedProvince.get();
        return selectedProvinceId ? Communes.find({provinceId:selectedProvinceId}) : null;
    }
});
