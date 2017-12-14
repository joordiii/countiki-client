import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';


const apiUrl = environment.apiUrl;

@Injectable()
export class EventService {

  constructor(private http: Http) { }

  getAll() {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.get(apiUrl + '/event', options)
      .map((res) => res.json());
  }

  getById(id) {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.get(apiUrl + '/event/' + id, options)
      .map((res) => res.json());
  }

  getUserEvents() {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.get(apiUrl + '/event/user-events/', options)
      .map((res) => res.json());
  }

  postEvent(event) {
    console.log('event', event);
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.post(apiUrl + '/event', event, options)
      .map((res) => res.json());
  }

  putAttendee(id, attendee) {
    const options = new RequestOptions();
    options.withCredentials = true;
    return this.http.put(apiUrl + '/event/' + id, attendee, options)
      .map((res) => res.json());
  }

}

