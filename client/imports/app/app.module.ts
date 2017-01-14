import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from '@angular/router';
import { AccountsModule } from 'angular2-meteor-accounts-ui';

import { AppComponent } from "./app.component";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FEEDING_LOGS_DECLERATIONS } from "./feeding-log";
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
  ],
  // Modules
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    AccountsModule
  ],
  // Main Component
  bootstrap: [ AppComponent ]
})
export class AppModule {
  constructor() {

  }
}
