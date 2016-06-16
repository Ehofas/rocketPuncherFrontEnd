import {Component} from '@angular/core';
import {HomeService} from "./home.service";

@Component({
  selector: 'Home',
  template: require('./home.html'),
  providers: [HomeService]
})
export class HomeComponent {
  gameId:string;
  member1:string;
  member2:string;
  member3:string;
  member4:string;
  endScore:number;


  constructor(private homeService:HomeService) {
    this.member1 = "";
    this.member2 = "";
    this.member3 = "";
    this.member4 = "";
    this.endScore = 11;
  }

  // submitPlayer1(value) {
  //   console.log('subitPlayer1', value);
  //   this.memberName.set('value', value);
  // }

  startGame() {
    var team1 = [this.member1, this.member2];
    var team2 = [this.member3, this.member4];
    this.homeService.startGame(this.endScore, team1, team2).subscribe(
      response => this.gameId = response.gameId,
      error => console.log(error));
  }

  ngOnInit() {
    console.log('hello `About` component');
  }

  asyncDataWithWebpack() {

  }

}
