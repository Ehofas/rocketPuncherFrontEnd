import {Component} from '@angular/core';
import {RightService} from "./right.service";

@Component({
  selector: 'RightSide',
  template: `
<div style="flex:100; align-self: flex-end">
    <h1>Tomas</h1>
    <div>
    <h1 style="font-size:700%">12</h1>
    </div>
   </div>
  `,
  providers: [RightService]
})
export class RightComponent {
  games:any;

  constructor(private rightService:RightService) {
  }
}
