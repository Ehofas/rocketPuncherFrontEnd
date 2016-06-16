import { Component } from '@angular/core';
import {GameService} from "./game.service";
import {LeftComponent} from "./Players/left.component"
import {RightComponent} from "./Players/right.component"


@Component({
  selector: 'Games',
  template: `
    <h1 style="text-align: center">Game in progress</h1>
    <div style="display: flex; flex-direction: row; justify-content:space-between">
      <LeftSide></LeftSide>
      <RightSide></RightSide>
    </div>
     <button type="submit" style="display: flex" (click)="stopGame()">STOP GAME</button>
  `,
  providers: [GameService],
  directives:[LeftComponent, RightComponent],
})
export class GamesComponent {
  games: any;

  constructor(private gameService: GameService) {

  }

  ngOnInit() {
    console.log('hello `About` component');

    // this.gameService.stopGame().subscribe(
    //   response => console.log(this.games = response),
    //   error => console.log(error)
    // );

  }

  stopGame() {
    console.log('pressed a stop game button');
    //console.log(this.gameService.stopGame());
    this.gameService.stopGame().subscribe(
      response => {
        console.log(response)
        console.log(["test"])
        // start game
      },
      error => console.log(error)
    );
  }
  asyncDataWithWebpack() {

  }

}
