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
  allUserEvents;

  constructor(private authService: AuthService, private eventService: EventService) { }

  ngOnInit() {
/*     this.authService.userChange$.subscribe((user) => {
      this.user = user;
    }); */
    this.getUserOwnEvent();
     this.user = this.authService.getUser();
   }

  getUserOwnEvent() {
    this.eventService.getUserEvents()
      .subscribe((data) => {this.allUserEvents = data;
      console.log('data event profile', data);
      });
  }
}
