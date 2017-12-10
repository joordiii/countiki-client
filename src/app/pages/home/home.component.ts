import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user = null;
  eventData: Array<object>= [];

  constructor(private authService: AuthService, private eventService: EventService) { }

   ngOnInit() {
    this.user = this.authService.getUser();
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getAll()
      .subscribe((data) => {this.eventData = data, console.log(this.eventData[0], '12345');
      });
      }
  }
