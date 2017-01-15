import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MeteorObservable } from 'meteor-rxjs';

import * as moment from 'moment';

import { FeedingLogs } from "../../../../both/collections/feedingLogs.collection"
import { FeedingLog } from "../../../../both/models/feedingLog.model"

import template from './feeding-log-time-since.component.html';

@Component({
    selector: 'feeding-log-time-since',
    template
})
export class FeedingLogTimeSinceComponent implements OnInit, OnDestroy {
    feddingLogs: Observable<FeedingLog[]>;
    feddingLog: Observable<any>;
    feddingLogSub: Subject<any> = new Subject();
    feddingLogsSub: Subscription;

    optionsSub: Subscription;

    constructor() {

    }

    ngOnInit() {

        const options = {
            sort: { time: -1 }
        };

        this.feddingLogs = FeedingLogs.find({}, options).zone();
        this.feddingLogsSub = MeteorObservable.subscribe('feedingLogs').subscribe();

        this.feddingLogs.subscribe((x) => {

            if (x.length > 0 && x[0]) {
                var latestDate = x[0].time;



                var startTime = moment(latestDate);
                var endTime = moment();
                var duration = moment.duration(endTime.diff(startTime));
                var hours = duration.asHours();
                var h = Math.floor(hours);
                var minutes = duration.asMinutes() - h * 60;

                
                var m = Math.round(minutes);

                this.feddingLogSub.next({hours: h, minutes : m});

            }
            

            
        });

        this.feddingLog = this.feddingLogSub.asObservable();


    }



    latestFeedingLog(): FeedingLog {
        return this.feddingLogs[0];
    }

    ngOnDestroy() {
        this.feddingLogsSub.unsubscribe();
    }

}