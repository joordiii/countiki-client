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

    this.getEventId(this.eventId);
    console.log('ara si', this.data.location.latitude);
    // console.log('map center: ', this.mapCenter);
    // set google maps defaults
    this.zoom = 4;
    this.latitude = this.data.location.latitude;
    this.longitude = this.data.location.latitude;

    /* this.zoom = 4;
    this.latitude = 41.390205;
    this.longitude = 2.154007; */

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    /* this.setCurrentPosition(); */

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          /* this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12; */
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
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
        console.log('map2',  this.data.location.latitude);
      });
  }

}



