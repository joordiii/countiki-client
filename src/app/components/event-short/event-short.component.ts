import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-short',
  templateUrl: './event-short.component.html',
  styleUrls: ['./event-short.component.css']
})
export class EventShortComponent implements OnInit {

  eventData: Array<object>= [];
  
  
    constructor(private eventService: EventService) { }
  
    ngOnInit() {
      this.getAllEvents();
    }
  
    getAllEvents() {
      this.eventService.getAll()
      .subscribe((data) => {this.eventData = data,
      console.log(this.eventData);
    });
    }
}
