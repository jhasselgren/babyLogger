import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from "@angular/core";

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { MeteorObservable } from 'meteor-rxjs';

import * as fromRoot from './reducers'
import * as feedingLog from './actions/feedingLog'

import { FeedingLog } from "../../../both/models/feedingLog.model"
import { FeedingLogsService } from "./services/feeding-logs.service"

import template from "./app.component.html";


@Component({
  selector: "app",
  template,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy, OnInit {

  private feedingLogs: Observable<FeedingLog[]>;
  private latestLog: Observable<FeedingLog>;

  constructor(private feedingLogsService: FeedingLogsService, private store: Store<fromRoot.State>) {
    var result = this.feedingLogsService.loadData();
    this.feedingLogs = this.store.select(fromRoot.getFeedingLogs);
    this.latestLog = this.store.select(fromRoot.getLatestLog);
  }

  addLog(log : FeedingLog){
    this.store.dispatch(new feedingLog.AddLogAction(log));
  }

  removeLog(id : string){
    this.store.dispatch(new feedingLog.RemoveLogAction(id));
  }
  
  ngOnInit() {

  }

  ngOnDestroy() {
    this.feedingLogsService.close()
  }
}
