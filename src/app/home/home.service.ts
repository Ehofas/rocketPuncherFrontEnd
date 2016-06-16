import {Component, Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class HomeService {

  constructor(private http:Http) {
  }

  getGames() {
    return this.http.get("http://192.168.1.74:5135/games")
      .map(this.extractData)
      .catch(this.handleError);
  }

  startGame(endScore, team1, team2) {
    return this.http.post("http://192.168.1.74:5135/games", {
      "endScore": endScore,
      "deviceId": "b977d0488fe60ba27f01392cfc686299",
      teams: {
        "1": team1,
        "2": team2
      }
    }).map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res:Response) {
    return res.json() || {};
  }

  private handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
