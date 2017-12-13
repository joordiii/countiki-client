import { Component, OnInit, ElementRef, NgZone, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() eventId: any;
/* @Input() mapCenter: {
  latitude: number;
  longitude: number;
}; */

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

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private eventService: EventService) {}
  

  ngOnInit() {

/*  */
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  getEventId(id) {
    this.eventService.getById(id)
      .subscribe((data) => {
        this.data = data;
        console.log('map',  this.data);
        console.log('map2',  this.data);
      });
  }

}



