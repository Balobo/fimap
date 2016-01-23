Posts = new Mongo.Collection('posts');
PostsLikes = new Mongo.Collection('postsLikes');
Projects = new Mongo.Collection('projects');
ProjectFiles = new Mongo.Collection('projectFiles');
ProjectPictures = new Mongo.Collection('projectPictures');
Articles = new Meteor.Collection('articles');
ArticlesComments = new Meteor.Collection('articlesComments');
ArticlesLikes = new Mongo.Collection('articleslikes');
ChatRooms = new Meteor.Collection("chatrooms");
Adherent = new Meteor.Collection('adherent');
Notification = new Meteor.Collection('notification');
Regions = new Meteor.Collection('regions');
Actions = new Meteor.Collection('actions');
Budgets = new Meteor.Collection('budgets');
Villes = new Meteor.Collection('villes');
Provinces = new Meteor.Collection('provinces');
Communes = new Meteor.Collection('communes');
DocumentsBiblio = new Meteor.Collection('documentsBiblio');
Depenses = new Meteor.Collection('depenses');
Bailleurs = new Meteor.Collection('bailleurs');
Fonds = new Meteor.Collection('fonds');

// =========== Search config
Projects.initEasySearch(['projectType', 'projectDesc'], {
    'limit': 30,
    'use': 'mongo-db'
});

Regions.initEasySearch(['nom', 'desc','budget','adminRegion'], {
    'limit': 30,
    'use': 'mongo-db'
});

Adherent.initEasySearch(['prenom', 'nom', 'region.nom','cin'], {
    'limit': 30,
    'use': 'mongo-db'
});

Actions.initEasySearch(['titre', 'lieux', 'date','desc','region.nom'], {
    'limit': 30,
    'use': 'mongo-db'
});

Budgets.initEasySearch(['region.nom', 'annee', 'budget','statut'], {
    'limit': 30,
    'use': 'mongo-db'
});

EasySearch.createSearchIndex('users', {
    field: 'username',
    collection: Meteor.users,
    use: 'mongo-db',
    query: function (searchString, opts) {
        // Default query that is used for searching
        var query = EasySearch.getSearcher(this.use).defaultQuery(this, searchString);

        // Make the emails searchable
        query.$or.push({
            emails: {
                $elemMatch: {
                    address: {'$regex': '.*' + searchString + '.*', '$options': 'i'}
                }
            }
        });
        return query;
    }
});