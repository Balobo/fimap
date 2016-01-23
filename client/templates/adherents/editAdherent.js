/**
 * Created by ADMIN on 07/07/2015.
 */

var uploader5 = new Slingshot.Upload("myFileUploads");

Template.editAdherent.onRendered(function () {
    this.$('.datetimepicker').datetimepicker({
            locale: 'fr',
            format: 'DD.MM.YYYY'
        }
    );
});

Handlebars.registerHelper('selectedIfEquals', function (left, right) {
    return left == right ? "selected" : "";
});

Template.editAdherent.created = function () {
    this.selectedProvince = new ReactiveVar(null);
    var curAdherent = Adherent.findOne({_id: Session.get('curAdherentId')});
    this.selectedProvince.set(curAdherent.province);
};

var updateForm = function () {

    var curAdherent = Adherent.findOne({_id: Session.get('curAdherentId')});
    var sexe = curAdherent.sexe;
    var radioId = sexe + "Radio";
    console.log('this is the current project');
    console.log(curAdherent);
    $('#prenom').val(curAdherent.prenom);
    $('#nomFamille').val(curAdherent.nom);
    $('#cin').val(curAdherent.cin);
    $('#dateNaissance').val(curAdherent.dateNaissance);
    $('#numEnreg').val(curAdherent.numEnreg);
    $('#cps').val(curAdherent.cps);
    $('#tel').val(curAdherent.tel);
    $('#email').val(curAdherent.email);
    $('#adherent').val(curAdherent.adherent);
    $('#province').val(curAdherent.province);
    $('#adresse').val(curAdherent.adresse);
    $('#nbrRuchesSah').val(curAdherent.NombreRuchesSahariennes);
    $('#nbrRuchesNoires').val(curAdherent.NombreRuchesNoires);
    $('#commentaire').val(curAdherent.commentaire);
    //TODO ;: verifier ce code pour la photo de l'adherent.
    //$('#testPic').val(curAdherent.profilePic);
    var radiobtn = document.getElementById(radioId);
    radiobtn.checked = true;
    console.log('updating the form');
};


Template.editAdherent.helpers({
    currAdh: function () {
        return Adherent.findOne({_id: Session.get('curAdherentId')});
    },
    villes: function () {
        return Villes.find({regionId: Meteor.user().profile.region._id}).fetch();
    },
    villesAdmin: function () {
        return Villes.find().fetch();
    },
    provinces: function (evnt, tmpl) {
        return Provinces.find({regionId: Meteor.user().profile.region._id}).fetch();
    },
    provincesAdmin: function (evnt, tmpl) {
        return Provinces.find().fetch();
    },
    communes: function () {
        var selectedProvinceId = Template.instance().selectedProvince.get();
        var provinceId = selectedProvinceId ? selectedProvinceId : this.province;
        console.log(provinceId);
        return selectedProvinceId ? Communes.find({provinceId: provinceId}) : null;
    }
});

Router.route('/adherents/:_id', {
    name: 'editAdherent',
    onAfterAction: function () {
        Session.set('curAdherentId', this.params._id);
        console.log('Session have the id of adherent');
        updateForm();
    }
});

Template.editAdherent.rendered = function () {
    Deps.autorun(function () {
        updateForm();
    })

};


Template.editAdherent.events({

    'click .updateAdherent': function (evnt, tmpl) {

        var errorExit = null;

        var file = $('input.file_bag')[0].files[0];

        var radioValue;
        if (document.getElementById('hommeRadio').checked) {
            radioValue = document.getElementById('hommeRadio').value;
        } else if (document.getElementById('femmeRadio').checked) {
            radioValue = document.getElementById('femmeRadio').value;
        } else {
            errorExit = true;
        }

        var nbreRuchesSah = tmpl.find('#nbrRuchesSah').value ? tmpl.find('#nbrRuchesSah').value : 0;
        var nbreRuchesNoire = tmpl.find('#nbrRuchesNoires').value ? tmpl.find('#nbrRuchesNoires').value : 0;
        var nbreRuches = nbreRuchesSah - (0 - nbreRuchesNoire);

        var adherent = {
            _id: Session.get('curAdherentId'),
            prenom: tmpl.find('#prenom').value,
            nom: tmpl.find('#nomFamille').value,
            cin: tmpl.find('#cin').value,
            dateNaissance: tmpl.find('#dateNaissance').value,
            sexe: radioValue,
            numEnreg: tmpl.find('#numEnreg').value,
            cps: tmpl.find('#cps').value,
            tel: tmpl.find('#tel').value,
            email: tmpl.find('#email').value,
            adherent: tmpl.find('#adherent').value,
            province: tmpl.find('#province').value,
            commune: tmpl.find('#commune').value,
            ville: tmpl.find('#ville').value,
            //village: tmpl.find('#village').value,
            //quartier: tmpl.find('#quartier').value,
            adresse: tmpl.find('#adresse').value,
            nombreRuches: nbreRuches,
            NombreRuchesNoires: nbreRuchesNoire,
            NombreRuchesSahariennes: nbreRuchesSah,
            commentaire: tmpl.find('#commentaire').value
        };

        console.log(adherent);

        if (!adherent.prenom) {
            errorExit = true;
        }
        if (!adherent.nom) {
            errorExit = true;
        }
        /* if (!adherent.ville) {
         errorExit = true;
         }*/
        if (!adherent.cin) {
            errorExit = true;
        }
        if (!adherent.nombreRuches) {
            errorExit = true;
        }
        if (!adherent.numEnreg) {
            errorExit = true;
        }
        /*if (!adherent.cps) {
         errorExit = true;
         }*/
        if (errorExit) {
            sAlert.error("Merci de renseigner les champs obligatoires", {
                effect: 'bouncyflip',
                position: 'bottom',
                timeout: 5000,
                onRouteClose: false,
                stack: false
            });
        } else {
            if (file) {
                uploader5.send(file, function (error, downloadUrl) {

                    var adherent = {
                        _id: Session.get('curAdherentId'),
                        prenom: tmpl.find('#prenom').value,
                        nom: tmpl.find('#nomFamille').value,
                        cin: tmpl.find('#cin').value,
                        dateNaissance: tmpl.find('#dateNaissance').value,
                        sexe: radioValue,
                        numEnreg: tmpl.find('#numEnreg').value,
                        cps: tmpl.find('#cps').value,
                        tel: tmpl.find('#tel').value,
                        email: tmpl.find('#email').value,
                        adherent: tmpl.find('#adherent').value,
                        province: tmpl.find('#province').value,
                        commune: tmpl.find('#commune').value,
                        ville: tmpl.find('#ville').value,
                        //village: tmpl.find('#village').value,
                        //quartier: tmpl.find('#quartier').value,
                        adresse: tmpl.find('#adresse').value,
                        nombreRuches: nbreRuches,
                        NombreRuchesNoires: nbreRuchesNoire,
                        NombreRuchesSahariennes: nbreRuchesSah,
                        commentaire: tmpl.find('#commentaire').value,
                        profilePic: downloadUrl
                    };

                    Meteor.call('updateAdherent', adherent, function (error, result) {
                        if (error) {
                            sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                                effect: 'bouncyflip',
                                position: 'bottom',
                                timeout: 5000,
                                onRouteClose: false,
                                stack: false
                            });
                        } else {
                            sAlert.info("Mise a jour de votre adherent Reussie", {
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
                Meteor.call('updateAdherentNoPic', adherent, function (error, result) {
                    if (error) {
                        sAlert.error("Une Erreur s'est produite, veuillez contacter votre administrateur", {
                            effect: 'bouncyflip',
                            position: 'bottom',
                            timeout: 5000,
                            onRouteClose: false,
                            stack: false
                        });
                    } else {
                        sAlert.info("Mise a jour de votre adherent Reussie", {
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
    'change #province': function (evt, instance) {
        var provinceId = $(evt.target).val();
        var codeProvince = Provinces.findOne({_id: provinceId}).codeProvince;
        document.getElementById("cps").value = codeProvince;
        instance.selectedProvince.set(provinceId);
    }
});

Template.progressBar5.helpers({
    progress: function () {
        console.log(uploader5.progress());
        return Math.round(uploader5.progress() * 100);
    }
});