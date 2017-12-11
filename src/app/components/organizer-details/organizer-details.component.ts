import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-organizer-details',
  templateUrl: './organizer-details.component.html',
  styleUrls: ['./organizer-details.component.css']
})
export class OrganizerDetailsComponent implements OnInit {
/* @Input() dataUser: any; */
@Input() dataUser: any;

  constructor() { }

  ngOnInit() {
    console.log('usercito: ', this.dataUser);
  }

}
