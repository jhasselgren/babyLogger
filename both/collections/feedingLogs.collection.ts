
import { MongoObservable } from 'meteor-rxjs';
import {FeedingLog } from '../models/feedingLog.model'
 
//export const FeedingLogs = new MongoObservable.Collection<FeedingLog>('feedingLogs');

export const FeedingLogs = new Mongo.Collection<FeedingLog>('feedingLogs');

function loggedIn() {
  return !!Meteor.user();
}
 
function allowAll()  {return true;}

FeedingLogs.allow({
  insert: allowAll,
  update: loggedIn,
  remove: loggedIn
});