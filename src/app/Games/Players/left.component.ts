import { Component } from '@angular/core';
import {LeftService} from "./left.service";


@Component({
  selector: 'LeftSide',
  template: `
<div style="flex:100; flex-wrap: wrap">
    <h1>Lina</h1>
    <div>
    <h1 style="font-size:700%">{{value}}</h1>
    </div>
  </div>
  `,
  inputs: ["value"]
})
export class LeftComponent {
  public value: number;

  constructor() {
    console.log("making left");
  }
}
