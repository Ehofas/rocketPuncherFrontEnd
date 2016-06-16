import { Component } from '@angular/core';
import {LeftService} from "./left.service";

@Component({
  selector: 'LeftSide',
  template: `
<div style="flex:100; flex-wrap: wrap">
    <h1>Lina</h1>
    <div>
    <h1 style="font-size:700%">11</h1>
    </div>
  </div>
  `,
  providers: [LeftService]
})
export class LeftComponent {
  games:any;

  constructor(private leftService:LeftService) {
  }
}
