import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';
import {HomeService} from "./home.service";

@Component({
  selector: 'Home',
  styleUrls: ['./app/home/home.css'],
  template: require('./home.html'),
  providers: [HomeService]
})
export class HomeComponent {
  gameId:string;
  members:any;
  endScore:number;
  emptyMember = "";

  constructor(private _router:Router, private homeService:HomeService) {
    this.members = [this.emptyMember, this.emptyMember, this.emptyMember, this.emptyMember];
    this.endScore = 11;
  }

  // submitPlayer1(value) {
  //   console.log('subitPlayer1', value);
  //   this.memberName.set('value', value);
  // }

  startGame() {
    var team1 = [this.members[0], this.members[2]];
    var team2 = [this.members[1], this.members[3]];
    this.homeService.startGame(this.endScore, team1, team2).subscribe(
      response => {
        this.gameId = response.gameId;
        this._router.navigate(['Games', {gameId: this.gameId}]);
      },
      error => console.log(error)
    );
  }

  playSound() {
    var audio = new Audio();
    audio.src = "./assets/sounds/rockySoundtrack.mp3";
    audio.load();
    audio.play();
  }

  ngOnInit() {
    console.log('hello `About` component');
  }

  shuffleTeams() {
    var allPresentPlayers = this.members.filter((player) => player != this.emptyMember);

    var memberCountDifference = this.members.length - allPresentPlayers.length;
    this.members.splice(0, this.members.length);

    while (allPresentPlayers.length > 0) {
      var random = Math.floor(Math.random() * allPresentPlayers.length);
      var member = allPresentPlayers.splice(random, 1)[0];
      this.members.push(member);
    }
    for (var i = 0; i < memberCountDifference; i++)
      this.members.push(this.emptyMember)
  }

}
