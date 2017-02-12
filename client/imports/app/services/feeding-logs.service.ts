import { Injectable, OnInit, OnDestroy } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import { MeteorObservable } from 'meteor-rxjs';

import { FeedingLogs } from "../../../../both/collections/feedingLogs.collection"
import { FeedingLog } from "../../../../both/models/feedingLog.model"

//import { AppStore } from "../store/app.store"

import * as fromRoot from '../reducers';
import * as feedingLog from '../actions/feedingLog'


@Injectable()
export class FeedingLogsService {

    dataLoading: Observable<any>;
    feddingLogs: Observable<FeedingLog[]>;
    feedingLogsSub: Subscription;
    dataLoaded : boolean;


    constructor(private store: Store<fromRoot.State>) {
       
        
    }

    public saveLog(log : FeedingLog) : FeedingLog{
        if(log._id == undefined || log._id === ''){
            var id = FeedingLogs.insert(log);
            var result = Object.assign({}, {_id: id}, log);
            return result;
        }
        
        FeedingLogs.update(log._id, log);
        return Object.assign({}, log);
    }

    public loadData(){
        this.dataLoading = MeteorObservable.subscribe<any>('feedingLogs');
        this.feedingLogsSub = this.dataLoading.subscribe(() => {
            var result = FeedingLogs.find({}).fetch();
            this.store.dispatch(new feedingLog.LoadLogsAction(result));
        });
    }

    public removeLog(id) : boolean{
        var result = FeedingLogs.remove(id);
        return true;
    }

    public close(){
        this.feedingLogsSub.unsubscribe();
    }
}