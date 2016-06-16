import { Component } from '@angular/core';
import {LeftService} from "./left.service";

@Component({
  selector: 'LeftSide',
  template: `
    <h1>Player left</h1>
    <div>
      For hot module reloading run
      <pre>npm run start:hmr</pre>
    </div>
  `,
  providers: [LeftService]
})
export class LeftComponent {
  games:any;

  constructor(private leftService:LeftService) {
  }
}
