import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import * as feedingLog from '../actions/feedingLog'

import { FeedingLogsService } from '../services/feeding-logs.service'

import { FeedingLog } from '../../../../both/models/feedingLog.model'

@Injectable()
export class FeedingLogEffects {
  constructor(private actions$: Actions, private feedingLogsService: FeedingLogsService) {

   }

   @Effect()
   addLogToCollection$: Observable<Action> = this.actions$
    .ofType(feedingLog.ActionTypes.ADD_LOG)
    .map((action : feedingLog.AddLogAction) => action.payload)
    .mergeMap(log => 
      Observable.of(this.feedingLogsService.saveLog(log))
        .map(result => new feedingLog.AddLogSuccessAction(result))
    );
    
    @Effect()
    removeLogFromCollection: Observable<Action> = this.actions$
      .ofType(feedingLog.ActionTypes.REMOVE_LOG)
      .map((action : feedingLog.RemoveLogAction) => action.payload)
      .mergeMap(id => 
        Observable.of(this.feedingLogsService.removeLog(id))
          .map(() => new feedingLog.RemoveLogSuccessAction(id))
      );
      

//    @Effect()
//    loadFeedingLogs: Observable<Action> = this.actions$
//     .ofType(feedingLog.ActionTypes.LOAD)
//     .startWith(new feedingLog.LoadLogsAction())
//     .switchMap(() => this.feedingLogsService.loadData()
//         .map((logs: FeedingLog[]) => new feedingLog.LoadLogsSuccessAction(logs))
//     );
        
}