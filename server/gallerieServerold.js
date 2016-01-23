
Meteor.methods({

    'uploadGalleriesPictures' : function(downloadUrl){


        var galleries = Gallerie.find({gallerieOwner:Meteor.userId()}).fetch();

        if(galleries.length == 0){
            var pictureArray = new Array();
            pictureArray.push(downloadUrl);
            var gallerie = {
                gallerieOwner : Meteor.userId(),
                pictures : pictureArray
            };

            Gallerie.insert(gallerie);
        } else {
            Gallerie.update({gallerieOwner:Meteor.userId()}, {$push: {"pictures":downloadUrl}});
        }


    }

});




