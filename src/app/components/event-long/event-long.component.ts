import { Component, OnInit, ElementRef, NgZone, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EventComponent } from '../../pages/event/event.component';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { MapsAPILoader } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { AgmCircle } from '@agm/core/directives/circle';
import { AgmPolygon } from '@agm/core/directives/polygon';
import { AgmPolyline } from '@agm/core/directives/polyline';

@Component({
  selector: 'app-event-long',
  templateUrl: './event-long.component.html',
  styleUrls: ['./event-long.component.css']
})
export class EventLongComponent implements OnInit {
@Input() eventId: any;

  data = new Event({
    user_id: '',
    slogan: '',
    startDate: '',
    endDate: '',
    location: {
      coordinates: []
    },
    description: '',
    organizationName: '',
    myAddress: '',
    myTelephone: '',
    myEmail: '',
    myWeb: '',
    attendance: ''
  });

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public iconUrl = 'https://image.flaticon.com/icons/png/128/145/145602.png';
  public fillColor = '#35aa00';
  public fillOpacity = 0.5;
  public radius = 300;

 
  @ViewChild('circle', {read: AgmCircle})
  public searchCircle: AgmCircle;

  @ViewChild('search') 
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router, private eventService: EventService) { }

  ngOnInit() {

    // get bounds of the circle
    console.log(this.searchCircle);
    /* this.searchCircle.getBounds().then((bounds) => {
      console.log(bounds);
    })
    .catch((err) => {
      console.log(err.message);
    }); */

    this.getEventId(this.eventId);

    // set google maps defaults
    this.zoom = 15;


    // create search FormControl
    this.searchControl = new FormControl();

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
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;

        });
      });
    });
  }

  getEventId(id) {
    this.eventService.getById(id)
      .subscribe((data: Event) => {
        this.data = data;
        console.log('map', this.data);
        console.log('map2', this.data.attendance);
        this.latitude = this.data.location.coordinates[0] ;
        this.longitude = this.data.location.coordinates[1];
      });
  }

  addAttendeeEvent() {
      const add = {
      location: {
        coordinates: [this.latitude, this.longitude]
      }
    };

    this.eventService.putAttendee(this.eventId, add)
    .subscribe(
      () => this.router.navigate(['/success']));
      console.log();
  }

}
