import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventComponent } from '../../pages/event/event.component';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-long',
  templateUrl: './event-long.component.html',
  styleUrls: ['./event-long.component.css']
})
export class EventLongComponent implements OnInit {
@Input() eventId: any;

  data = new Event({
    user_id: '',
    slogan: '',
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    organizationName: '',
    myAddress: '',
    myTelephone: '',
    myEmail: '',
    myWeb: '',
  });

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEventId(this.eventId);
  }

  getEventId(id) {
    this.eventService.getById(id)
      .subscribe((data) => {
        this.data = data;
        console.log('ret',  this.data);
        console.log('of',  this.data.location.latitude);
      });
  }

}
