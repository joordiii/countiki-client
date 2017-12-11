import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  dataCreateForm = {
    slogan: '',
    startDate: '',
    endDate: '',
    description: '',
    location: ''
  };

  error: String;
  feedbackEnabled: boolean;
  processing: any;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit() {
  }

  createEventClick() {
    console.log(this.dataCreateForm);
    this.eventService.postEvent(this.dataCreateForm)
      .subscribe(
      () => this.router.navigate(['/home']),
      (err) => this.error = err);
      console.log(this.dataCreateForm, 'qwe');
  }

}
