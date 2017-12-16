import { Component, OnInit, ElementRef, NgZone, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EventComponent } from '../../pages/event/event.component';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { MapsAPILoader } from '@agm/core';

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

  public latitude: Number;
  public longitude: Number;
  public searchControl: FormControl;
  public zoom: number;

 @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private router: Router, private eventService: EventService) { }

  ngOnInit() {

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
