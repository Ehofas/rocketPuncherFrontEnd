import { Component } from '@angular/core';
import {GameService} from "./game.service";
import {LeftComponent} from "./Players/left.component"
import {RightComponent} from "./Players/right.component"
import {RouteParams, OnActivate, ComponentInstruction} from 'angular2/router';


@Component({
  selector: 'Games',
  template: `
    <h1 style="text-align: center">Game in progress</h1>
    <div style="display: flex; flex-direction: row; justify-content:space-between">
      <LeftSide [value]="leftValue"></LeftSide>
      <LeftSide [value]="rightValue"></LeftSide>
      <!--<RightSide></RightSide>-->
    </div>
     <button type="submit" style="display: flex; margin:0 auto;" (click)="stopGame()">STOP GAME</button>
  `,
  providers: [GameService, LeftComponent],
  directives:[LeftComponent, RightComponent],
})
export class GamesComponent {
  gameId: string;
  leftValue: any;
  rightValue: any;
  games: any;
  pointsIntervalRef: number;
  currentState: any = {
    "_id": "Unknown",
    "status": "Unknown",
    "teams": {
      "1": [
        "Unknown"
      ],
      "2": [
        "Unknown"
      ]
    },
    "deviceId": "Unknown",
    "endScore": 11,
    "scores": {
      "teams": {
        "1": {
          "score": 0
        },
        "2": {
          "score": 0
        }
      }
    }
  };

  constructor(private gameService: GameService, params: RouteParams) {
    this.gameId = params.get('gameId');

  }

  ngOnInit() {
    console.log('hello `About` component');

    this.pointsIntervalRef = setInterval(() => {

      this.gameService.getScore(this.gameId).subscribe(
        response => {
          this.currentState = response;
          if (response) {
            this.leftValue = this.currentState.scores.teams["1"].score;
            this.rightValue = this.currentState.scores.teams["2"].score;
          }
        },
        error => console.log(error)
      );

    }, 1000);

  }

  // Cleanup
  ngOnDestroy() {
    clearInterval(this.pointsIntervalRef);
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
