import { Component } from '@angular/core';
import {GameService} from "./game.service";
import {LeftComponent} from "./Players/left.component"

@Component({
  selector: 'Games',
  template: `
    <h1>Game in progress</h1>
    <div>
      For hot module reloading run
      <pre>npm run start:hmr</pre>
    </div>
    <div>
      <h3>
        patrick@AngularClass.com
      </h3>
      <LeftSide>loading...</LeftSide>
      <RightSide>loading...</RightSide>
    </div>
  `,
  providers: [GameService],
  directives:[LeftComponent/*, RightComponent*/],
})
export class GamesComponent {
  games: any;

  constructor(private gameService: GameService) {

  }

  ngOnInit() {
    console.log('hello `About` component');

    this.gameService.getGames().subscribe(
      response => this.games = response,
      error => console.log(error)
    );

  }
  asyncDataWithWebpack() {

  }

}
