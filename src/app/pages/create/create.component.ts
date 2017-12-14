import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public address: string;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  user = null;

  dataCreateForm = {
    slogan: '',
    startDate: '',
    endDate: '',
    description: '',
    location: {
      latitude: this.latitude,
      longitude: this.longitude,
    },
    address: '',
  };

  error: String;
  feedbackEnabled: boolean;
  processing: any;

  constructor(private eventService: EventService,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();

    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = 12;

    // create search FormControl
    this.searchControl = new FormControl();

    // set current position
    this.setCurrentPosition();

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
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log(place);
          this.address = place.formatted_address;
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

  createEventClick() {
    this.getCoords();
    const userAndEventForm = {
      eventForm: this.dataCreateForm,
      user: this.user
    };
    this.eventService.postEvent(userAndEventForm)
      .subscribe(
      () => this.router.navigate(['/home']),
      (err) => this.error = err);
      console.log(userAndEventForm, 'qwe');
  }

  getCoords() {
    this.dataCreateForm.location.latitude = this.latitude;
    this.dataCreateForm.location.longitude = this.longitude;
    this.dataCreateForm.address = this.address;
  }

}
