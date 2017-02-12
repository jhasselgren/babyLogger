import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';

import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
//import { feedingLogs } from './store/feeding-logs.reducer'

import { AppComponent } from "./app.component";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FEEDING_LOGS_DECLERATIONS } from "./feeding-log";
import { FeedingLogsService } from "./services/feeding-logs.service"

import { FeedingLogEffects } from './effects/feedingLog'
import { reducer } from './reducers'

import { AreaChart } from "./chart/chart.component";

@NgModule({
  // Components, Pipes, Directive
  declarations: [
    AppComponent,
    AreaChart,
    ...FEEDING_LOGS_DECLERATIONS,
    
  ],
  // Entry Components
  entryComponents: [
    AppComponent
  ],
  // Providers
  providers: [
    FeedingLogsService
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AccountsModule,
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(FeedingLogEffects),
    Ng2GoogleChartsModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
