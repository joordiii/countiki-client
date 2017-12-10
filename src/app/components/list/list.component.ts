import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HomeComponent} from '../../pages/home/home.component';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
@Input() data: Object[];

  constructor(private eventService: EventService) { }

  ngOnInit() {
    console.log(this.data);
  }

}
