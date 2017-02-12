import { Component, Input, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
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
export class FeedingLogTimeSinceComponent implements OnInit, OnChanges {

    @Input() feedingLog: FeedingLog

    hours : number = 0;
    minutes : number = 0;
    

    constructor() {
     

    }

    getLatestHours(){
        if( this.feedingLog === undefined)
        {
            return 0;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        const change : SimpleChange = changes['feedingLog'];

        var input = change.currentValue;

        if(input == undefined){
            return;
        }


        var newValue = input as FeedingLog;

        var latestDate = newValue.time;

        var startTime = moment(latestDate);
        var endTime = moment();
        var duration = moment.duration(endTime.diff(startTime));
        var hours = duration.asHours();
        this.hours = Math.floor(hours);
        var minutes = duration.asMinutes() - this.hours * 60;


        this.minutes = Math.round(minutes);

    }

    ngOnInit() {


    }


}