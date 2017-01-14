import { FeedingLogs } from '../collections/feedingLogs.collection';

Meteor.methods({
    createLog: function(input){
        var owner = input.owner;
        check(owner, String);
        
        var user = Meteor.users.find({_id: owner});

        if(user){
            FeedingLogs.insert({time: Date.now(), owner: owner});
        }

    }
})