import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = null;
  userDetails: Object;
  allUserEvents: Object[];

  constructor(private authService: AuthService, private eventService: EventService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getUserOwnEvent();
  }

  getUserOwnEvent() {
    this.eventService.getUserEvents()
      .subscribe((data) => {this.allUserEvents = data; });
  }
}
