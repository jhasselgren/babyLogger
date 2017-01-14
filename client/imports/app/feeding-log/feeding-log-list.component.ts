import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import { OrderByPipe } from 'angular-pipes/src/array/order-by.pipe';

import { FeedingLogs } from "../../../../both/collections/feedingLogs.collection"
import { FeedingLog } from "../../../../both/models/feedingLog.model"

import template from './feeding-log-list.component.html';

@Component({
    selector: 'feeding-log-list',
    template
})
export class FeedingLogListComponent implements OnInit, OnDestroy {
    feddingLogs: Observable<FeedingLog[]>;
    feddingLogsSub: Subscription;
    constructor() { 
        
    }

    remove(log : FeedingLog){
        FeedingLogs.remove(log._id);
    }

    ngOnInit() { 
        this.feddingLogs = FeedingLogs.find({}).zone();
        this.feddingLogsSub = MeteorObservable.subscribe('feedingLogs').subscribe();
    }

    ngOnDestroy() {
        this.feddingLogsSub.unsubscribe();
    }

}