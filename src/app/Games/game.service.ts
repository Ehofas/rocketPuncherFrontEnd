import {Component, Injectable} from '@angular/core';
import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Rx";

@Injectable()
export class GameService {

  constructor(private http: Http) {}

  stopGame() {
    console.log('in stopGame');
    return this.http.post("http://localhost:3002/games/abort/5762e7b0783f5314310d0186", "")
      .map(this.extractData)
      .catch(this.handleError);
  }

  getScore(gameId:any) {
    console.log('in updateScore');
    return this.http.get("http://localhost:3002/games/" + gameId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
