/**
 * Created by ADMIN on 07/07/2015.
 */

Meteor.methods({
    'insertAdherent':function(adhe){
        Adherent.insert(adhe);
    },
    'removeAdherent':function(id){
        Adherent.remove({_id:id});
    },
    'updateAdherent':function(adherent){

            Adherent.update({_id: adherent._id}, {
                $set: {
                    prenom: adherent.prenom,
                    nom:adherent.nom ,
                    cin: adherent.cin,
                    dateNaissance: adherent.dateNaissance,
                    sexe: adherent.sexe,
                    cps:adherent.cps,
                    numEnreg:adherent.numEnreg,
                    tel: adherent.tel,
                    email: adherent.email,
                    adherent: adherent.adherent,
                    province:adherent.province ,
                    commune:adherent.commune ,
                    ville:adherent.ville ,
                    village: adherent.village,
                    quartier: adherent.quartier,
                    adresse:adherent.adresse,
                    nombreRuches: adherent.nombreRuches,
                    NombreRuchesNoires : adherent.NombreRuchesNoires,
                    NombreRuchesSahariennes : adherent.NombreRuchesSahariennes,
                    commentaire : adherent.commentaire,
                    profilePic : adherent.profilePic
                }
            });
    },
    'updateAdherentNoPic':function(adherent){

        Adherent.update({_id: adherent._id}, {
            $set: {
                prenom: adherent.prenom,
                nom:adherent.nom ,
                cin: adherent.cin,
                dateNaissance: adherent.dateNaissance,
                sexe: adherent.sexe,
                cps:adherent.cps,
                numEnreg:adherent.numEnreg,
                tel: adherent.tel,
                email: adherent.email,
                adherent: adherent.adherent,
                province:adherent.province ,
                commune:adherent.commune ,
                ville:adherent.ville ,
                village: adherent.village,
                quartier: adherent.quartier,
                adresse:adherent.adresse,
                nombreRuches: adherent.nombreRuches,
                NombreRuchesNoires : adherent.NombreRuchesNoires,
                NombreRuchesSahariennes : adherent.NombreRuchesSahariennes,
                commentaire : adherent.commentaire
            }
        });
    }
});