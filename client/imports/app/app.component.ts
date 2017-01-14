import { Component } from "@angular/core";

import template from "./app.component.html";


@Component({
  selector: "app",
  template
})
export class AppComponent {

  private user: string;

  constructor() {
    this.user = Meteor.userId();
  }
}
