// auth.service
// injectable Service
// intesection between angular and the server for passport
// handles logging in and/or registering users

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { TokenStorage } from './token.storage';
import { TooltipComponent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CometChatApiService } from '../chat/CometChatService/comet-chat-api.service';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient,
    private token: TokenStorage,
    private chatAuth: CometChatApiService
  ) {}

  public $userSource = new Subject<any>();

  login(email: string, password: string): Observable<any> {
    return Observable.create(observer => {
      this.http
        .post('/api/auth/login', {
          email,
          password
        })
        .subscribe((data: any) => {
          observer.next({ user: data.user });
          this.setUser(data.user);
          localStorage.activeUser = data.user._id;
          this.token.saveToken(data.token);
          observer.complete();
        });
    });
  }

  register(
    fullname: string,
    email: string,
    password: string,
    repeatPassword: string
  ): Observable<any> {
    return Observable.create(observer => {
      this.http
        .post('/api/auth/register', {
          fullname,
          email,
          password,
          repeatPassword
        })
        .subscribe((data: any) => {
          observer.next({ user: data.user });
          this.setUser(data.user);
          localStorage.activeUser = data.user._id;
          // An dieser Stelle erstellt man via Comet Chat API einen neuen Nutzer in der Chat Datenbank
          // für den neu registrierten Nutzer
          this.chatAuth.createUser(data.user._id, data.user.fullname);
          this.token.saveToken(data.token);
          observer.complete();
        });
    });
  }

  setUser(user): void {
    if (user) {
      user.isAdmin = user.roles.indexOf('admin') > -1;
    }
    this.$userSource.next(user);
    (<any>window).user = user;
  }

  getUser(): Observable<any> {
    return this.$userSource.asObservable();
  }

  me(): Observable<any> {
    return Observable.create(observer => {
      const tokenVal = this.token.getToken();
      if (!tokenVal) {
        return observer.complete();
      }
      this.http.get('/api/auth/me').subscribe((data: any) => {
        observer.next({ user: data.user });
        this.setUser(data.user);
        observer.complete();
      });
    });
  }

  signOut(): void {
    this.token.signOut();
    this.setUser(null);
    localStorage.activeUser = undefined;
    delete (<any>window).user;
  }
}
