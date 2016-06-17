import {Component} from '@angular/core';
import {GameService} from "./game.service";
import {LeftComponent} from "./Players/left.component"
import {RightComponent} from "./Players/right.component"
import {RouteParams, OnActivate, ComponentInstruction} from 'angular2/router';


@Component({
  selector: 'Games',
  template: `
    <h1 [hidden]="!gameInProgress" style="text-align: center">Game in progress</h1>
    <h1 [hidden]="gameInProgress" style="text-align: center; color:firebrick; font-size: 300%">Game Over!</h1>
    <div style="display: flex; flex-direction: row; justify-content:space-between">
      <LeftSide [value]="leftValue" [team]="leftTeam"></LeftSide>
      <LeftSide [value]="rightValue" [team]="rightTeam"></LeftSide>
    </div>
     <button type="submit" style="display: flex; margin:0 auto;" (click)="stopGame()">STOP GAME</button>
     <button type="submit" style="display: flex; margin:0 auto;" (click)="revertLastScore()">REVERT</button>
     <button type="submit" style="display: flex; margin:0 auto;" (click)="switchPlaces()"><- SWITCH -></button>
  `,
  providers: [GameService, LeftComponent],
  directives: [LeftComponent, RightComponent],
})
export class GamesComponent {
  normalPlayerOrder:boolean = true;
  gameInProgress:boolean;
  gameId:string;
  leftValue:any;
  rightValue:any;
  leftTeam:string;
  rightTeam:string;
  games:any;
  pointsIntervalRef:number;
  currentState:any = {
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

  constructor(private gameService:GameService, params:RouteParams) {
    this.gameId = params.get('gameId');

    this.gameInProgress = true;
  }

  ngOnInit() {
    console.log('hello `About` component');

    this.pointsIntervalRef = setInterval(() => {

      this.gameService.getScore(this.gameId).subscribe(
        response => {
          this.currentState = response;
          if (response) {
            if(this.normalPlayerOrder) {
              this.setTeamsInfo("1", "2");
            } else {
              this.setTeamsInfo("2", "1");
            }

            // Game over
            if (this.currentState.status === "ENDED") {
              clearInterval(this.pointsIntervalRef);
              this.gameInProgress = false;
            }
          }
        },
        error => console.log(error)
      );

    }, 1000);

  }

  private setTeamsInfo(leftTeam, rightTeam){
      this.leftValue = this.currentState.scores.teams[leftTeam].score;
      this.rightValue = this.currentState.scores.teams[rightTeam].score;
      this.leftTeam = this.currentState.teams[leftTeam];
      this.rightTeam = this.currentState.teams[rightTeam];
    };

  // Cleanup
  ngOnDestroy() {
    clearInterval(this.pointsIntervalRef);
  }

  stopGame() {
    console.log('pressed a stop game button');
    //console.log(this.gameService.stopGame());
    this.gameService.stopGame(this.gameId).subscribe(
      response => {
        console.log(response);
        console.log(["test"]);
        // start game
      },
      error => console.log(error)
    );
  }

  revertLastScore() {
    console.log('reverting last score');
    this.gameService.revertScore(this.gameId).subscribe(
      response => console.log("Success"),
      error => console.log(error)
    );
  }

  switchPlaces() {
    this.normalPlayerOrder = !this.normalPlayerOrder;
  }
}
