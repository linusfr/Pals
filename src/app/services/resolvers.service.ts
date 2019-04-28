import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ResolversService {
  constructor(private http: HttpClient) {}

  // login(email: string, password: string): Observable<any> {
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
}
