/**
 * Created by ADMIN on 07/07/2015.
 */

Meteor.methods({
    'insertRegion': function (region) {
        Regions.insert(region);
    },
    'removeRegion': function (id) {
        Regions.remove({_id: id});
    },
    'updateRegion': function (region) {

        Regions.update({_id: region._id}, {
            $set: {
                nom: region.nom,
                desc: region.desc,
                adminRegion: region.adminRegion
            }
        });
    },
    'updateRegionStatus': function (action) {
        Regions.update({_id: action._id}, {
            $set: {
                statut: action.statut
            }
        })
    },
    'insertVille': function (ville) {
        Villes.insert(ville);
    },
    'removeVille': function (id) {
        Villes.remove({_id: id});
    },
    'updateVille': function (ville) {

        Villes.update({_id: ville._id}, {
            $set: {
                nom: ville.nom
            }
        });
    },
    'updateProvince': function (province) {

        Provinces.update({_id: province._id}, {
            $set: {
                nom: province.nom,
                codeProvince: province.codeProvince
            }
        });
    },
    'insertProvince': function (province) {
        Provinces.insert(province);
    },
    'removeProvince': function (id) {
        Provinces.remove({_id: id});
    },
    'updateCommune': function (commune) {

        Communes.update({_id: commune._id}, {
            $set: {
                nom: commune.nom
            }
        });
    },
    'insertCommune': function (commune) {
        Communes.insert(commune);
    },
    'removeCommune': function (id) {
        Communes.remove({_id: id});
    }


});