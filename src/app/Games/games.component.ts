import {Component} from '@angular/core';
import {GameService} from "./game.service";
import {LeftComponent} from "./Players/left.component"
import {RouteParams, OnActivate, ComponentInstruction} from 'angular2/router';
import {Router} from '@angular/router-deprecated';
import {HomeService} from "../home/home.service";


@Component({
  selector: 'Games',
  styleUrls: ['./app/Games/games.css'],
  template: `
    <h1 [hidden]="!gameInProgress" style="text-align: center">Game in progress</h1>

    <h1 [hidden]="gameInProgress" style="text-align: center; color:firebrick; font-size: 300%">Game Over!</h1>
    
    <div style="display: flex; flex-direction: row; justify-content:space-between">
      <LeftSide [value]="leftValue" [team]="leftTeam"></LeftSide>
      <LeftSide [value]="rightValue" [team]="rightTeam"></LeftSide>
    </div>
    <div style="display: flex; flex-direction: row; justify-content:space-between">
     <button type="submit" class="stop-button" (click)="stopGame()">STOP GAME</button><br>
     <button type="submit" class="revert-button" (click)="revertLastScore()">REVERT</button><br>
     <button type="submit" class="switch-button" (click)="switchPlaces()">SWITCH</button>
     </div>
     <div style="display: flex; flex-direction: row; justify-content:space-between; margin-top:50px">
        <button type="submit" class="new-game-button" (click)="newGame()">NEW GAME</button>
        <button type="submit" class="new-game-button" (click)="restartGame()">RESTART</button>
</div>
  `,
  providers: [GameService, LeftComponent, HomeService],
  directives: [LeftComponent],
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
  currentState:any;

  constructor(private _router:Router, private gameService:GameService, private homeService:HomeService, params:RouteParams) {
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
              this.playSound();
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
  playSound() {
    var audio = new Audio();
    audio.src = "./assets/sounds/rockySoundtrack.mp3";
    audio.load();
    audio.play();
  }
  newGame() {
    this.stopGame();
    this._router.navigate(['Home']);
  }

  restartGame() {
    this.stopGame();
    if (this.currentState != "") {
      this.homeService.startGame(this.currentState.endScore, this.currentState.teams["1"], this.currentState.teams["2"]).subscribe(
        response => this.gameId = response.gameId,
        error => console.log(error)
      );
    }
    /*this.homeService.startGame();1*/
    console.log(this.currentState);
  }

  switchPlaces() {
    this.normalPlayerOrder = !this.normalPlayerOrder;
  }
}
