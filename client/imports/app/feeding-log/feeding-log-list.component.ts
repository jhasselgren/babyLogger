import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { FeedingLog } from "../../../../both/models/feedingLog.model"
import { StringMap } from "../../../../both/models/stringMap.model"

import * as moment from 'moment';

import template from './feeding-log-list.component.html';

@Component({
    selector: 'feeding-log-list',
    template
})
export class FeedingLogListComponent implements OnChanges {
    @Input() feddingLogs: FeedingLog[];
    @Input() logsPerDay: StringMap;
    @Output() remove = new EventEmitter<FeedingLog>();
    private pages : number = 1;

    private logsPerDayData: [[any, any]] = [['Date', 'Number'], [new Date(), 0]];

    constructor() {

    }

    public getFeedingLogs() : FeedingLog[]{
        return this.feddingLogs.slice(0, (10 * this.pages-1));
    }

    public viewMore(){
        this.pages = this.pages + 1;
    }

    ngOnChanges(changes: SimpleChanges) {
        const change: SimpleChange = changes['logsPerDay'];

        if (change.currentValue == undefined) {
            return;
        }

        var input: StringMap = change.currentValue;

        this.logsPerDayData = [
            ['Date', 'Number']
        ];

        Object.keys(input)
            .sort()
            .slice(-9)
            .forEach(key => {
            var row: [any, any] = [moment(key, 'YYYYMMDD').format('DD/MM'), input[key]];
            this.logsPerDayData.push(row);
        });

        this.chartData = Object.assign({}, this.chartData, {dataTable: this.logsPerDayData}) ;

        console.log(JSON.stringify(this.logsPerDayData));
    }

    chartData = {
        chartType: 'ColumnChart',
        dataTable: this.logsPerDayData,
        options: {
            legend:'none',
            chartArea:{left:10,top:10, width:"100%",height:"70%"}
        },
    };
}