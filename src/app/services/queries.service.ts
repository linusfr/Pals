import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private http: HttpClient) {}

  // getClubs() {
  // console.log('service function called');
  // fetch('/api/clubs/').then(data => {
  //   console.log(data);
  // });
  // return Observable.create(observer => {
  //   this.http.post('/api/clubs', {}).subscribe((data: any) => {
  //     observer.next({ clubs: data.clubs });
  //     console.log('test');
  //     console.log(data.clubs);
  //     observer.complete();
  //   });
  // });
  // }

  getClubs() {
    console.log('service function called');

    // ANGULAR DOCS EDITION
    // return this.http.get('/api/clubs').pipe(
    //     // Log the result or error
    //     data => this.log(filename, data),
    //     error => this.logError(filename, error)
    //   )
    // );

    // const observable = new Observable(observer => {
    //   observer.next('works');
    //   observer.next(this.http.get('/api/clubs'));
    // });
    // observable.subscribe({
    //   next(x) {
    //     console.log(x);
    //     console.log(JSON.stringify(x));
    //   },
    //   error(err) {
    //     console.error('something wrong occurred: ' + err);
    //   },
    //   complete() {
    //     console.log('done');
    //   }
    // });
    // .subscribe((data: any) => {
    //   observer.next({ user: data.user });
    //   console.log(data);
    //   console.log('still alive');
    //   observer.complete();
    // });
  }
}

// login(email: string, password: string): Observable < any > {
//   return Observable.create(observer => {
//     this.http
//       .post('/api/auth/login', {
//         email,
//         password
//       })
//       .subscribe((data: any) => {
//         observer.next({ user: data.user });
//         this.setUser(data.user);
//         this.token.saveToken(data.token);
//         observer.complete();
//       });
//   });
// }
