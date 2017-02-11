import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FeedingLog } from "../../../../both/models/feedingLog.model"

import template from './feeding-log-list.component.html';

@Component({
    selector: 'feeding-log-list',
    template
})
export class FeedingLogListComponent {
    @Input() feddingLogs: FeedingLog[];
    @Output() remove = new EventEmitter<FeedingLog>();

    constructor() { 
        
    }

}