import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';


const apiUrl = environment.apiUrl;

@Injectable()
export class EventService {

  constructor(private http: Http) { }

  getAll() {
    return this.http.get(apiUrl + '/event')
      .map((res) => res.json());
  }

  getById() {
    return this.http.get(apiUrl + '/event/:eventId')
      .map((res) => res.json());
  }

  postEvent(event) {
    return this.http.post(apiUrl + '/event', event)
      .map((res) => res.json());
  }

}

