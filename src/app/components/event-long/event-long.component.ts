import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventComponent } from '../../pages/event/event.component';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-long',
  templateUrl: './event-long.component.html',
  styleUrls: ['./event-long.component.css']
})
export class EventLongComponent implements OnInit {
@Input() eventId: any;

  data: any;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.getEventId(this.eventId);
  }

  getEventId(id) {
    console.log('manolito: ', id);
    this.eventService.getById(id)
      .subscribe((data) => {
        this.data = data;
        console.log(this.data, 'ret');
      });
  }

}
