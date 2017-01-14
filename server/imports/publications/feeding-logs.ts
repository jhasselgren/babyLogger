import { FeedingLogs } from '../../../both/collections/feedingLogs.collection';


Meteor.publish('feedingLogs', function() {

    const selector = {
        $and: [{
            owner: this.userId
        }, {
            owner: {
                $exists: true
            }
        }]
    };

    const options = {
        sort: {time: -1}
    };

    return FeedingLogs.find(selector, options);
});