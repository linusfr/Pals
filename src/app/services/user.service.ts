import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}

  isUserOnline = () => {
    let user = (<any>window).user;
    let loggedIn = user !== undefined;
    return loggedIn;
    // tslint:disable-next-line:semicolon
  };
}
