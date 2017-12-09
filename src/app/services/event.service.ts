import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, Response } from '@angular/http';
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
    return this.http.get(apiUrl + '/event/:id')
      .map((res) => res.json());
  }

}

