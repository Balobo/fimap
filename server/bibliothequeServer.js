/**
 * Created by HP on 08/12/2015.
 */

Meteor.methods({
    //{text:'',owner:'',date:'',parent:''}
    'addDocument':function(document){
        DocumentsBiblio.insert(document);
    },
    'removeDocument':function(id){
        DocumentsBiblio.remove({_id:id});
    }
});