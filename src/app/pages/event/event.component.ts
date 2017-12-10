import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  user = null;
  eventDetails = Object;

  constructor(private authService: AuthService, private eventService: EventService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getEventId();
  }

  getEventId() {
    this.eventService.getById()
      .subscribe((data) => {this.eventDetails = data, console.log(this.eventDetails); });
  }

}

