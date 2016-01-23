/**
 * Created by yassine on 09/03/15.
 */


Meteor.methods({

    'saveProject': function (project) {
        return Projects.insert(project);
    },

    'updateProject': function (project) {

        if(project.projectCover){
            Projects.update({_id: project._id}, {
                $set: {
                    "projectLocation": project.projectLocation,
                    "projectDate": project.projectDate,
                    "projectDesc": project.projectDesc,
                    "projectType":project.projectType,
                    "projectTitle":project.projectTitle,
                    "projectDepense":project.projectDepense,
                    "projectCover":project.projectCover,
                    "attachedAction":project.attachedAction
                }
            });
        } else {
            Projects.update({_id: project._id}, {
                $set: {
                    "projectLocation": project.projectLocation,
                    "projectDate": project.projectDate,
                    "projectDesc": project.projectDesc,
                    "projectType":project.projectType,
                    "projectTitle":project.projectTitle,
                    "projectDepense":project.projectDepense,
                    "attachedAction":project.attachedAction
                }
            });
        }

    },
    'removeProjectServer':function(_id){
      Projects.remove({_id:_id});
    },

    'removeProjectPicture':function(_id){
        ProjectPictures.remove({_id:_id});

    },
    'removeProjectFile':function(_id){
        ProjectFiles.remove({_id:_id});
    },

    'saveProjectPicture':function(projectPicture){
        ProjectPictures.insert(projectPicture);
    },

    'saveProjectFile':function(projectFile){
        ProjectFiles.insert(projectFile);
    },
    'insertUsers':function(userss){
        CustomUsers.insert(userss);
    }



})