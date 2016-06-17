import { Component } from '@angular/core';
import {LeftService} from "./left.service";


@Component({
  selector: 'LeftSide',
  template: `
<div style="flex:100; flex-wrap: wrap;">
    <section>
      <h1 *ngFor="let name of team" style="margin: 20px">{{name}}</h1>
      <h1 style="text-align: center" *ngFor="let name of team">{{name}}</h1>
    </section>
    <div>
    <h1 style="font-size:900%; margin:20px">{{value}}</h1>
    </div>
  </div>
  `,
  inputs: ["value", "team"]
})
export class LeftComponent {
  public value: number;
  public team: string[];

  constructor() {
    console.log("making left");
  }
}
