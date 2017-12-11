import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';


import { environment } from '../../environments/environment';
import { User } from '../models/user.model';

const apiUrl = environment.apiUrl + '/auth';

@Injectable()
export class AuthService {

  private loaded = false;
  private user: User;
  private userChange: Subject<User | null> = new Subject();

  // Observable string stream
  userChange$ = this.userChange.asObservable();

  constructor(private http: Http) {}

  private setUser(user: User = null) {
    this.loaded = true;
    this.user = user;
    this.userChange.next(user);
  }

  signup(user: User) {
    return this.http.post(apiUrl + '/signup', user)
      .map(res => {
        this.setUser(new User(res.json()));
        return user;
      });
  }

  login(user: User) {
    return this.http.post(apiUrl + '/login', user)
      .map(res => {
        this.setUser(new User(res.json()));
        return user;
      });
  }

  logout() {
    return this.http.post(apiUrl + '/logout', {})
    .map(res => {
      this.setUser();
      return null;
    });
  }

  me() {
     if (this.loaded) {
       return Promise.resolve(this.user);
     }
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.get(apiUrl + '/me', options)
      .toPromise()
      .then(res => {
        const user = new User(res.json());
        this.setUser(user);
        return user;
      })
      .catch((err) => {
        if (err.status === 404) {
          this.setUser();
        }
      });
  }

  getUser() {
    console.log('service: ', this.user);
    return this.user;
  }
}
