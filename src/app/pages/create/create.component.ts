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



  public customStyle = [
    {
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#ebe3cd'
        }
      ]
    },
    {
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#523735'
        }
      ]
    },
    {
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#f5f1e6'
        }
      ]
    },
    {
      'featureType': 'administrative',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#c9b2a6'
        }
      ]
    },
    {
      'featureType': 'administrative.land_parcel',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#dcd2be'
        }
      ]
    },
    {
      'featureType': 'administrative.land_parcel',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#ae9e90'
        }
      ]
    },
    {
      'featureType': 'landscape.natural',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#dfd2ae'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#dfd2ae'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'labels.text',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#93817c'
        }
      ]
    },
    {
      'featureType': 'poi.business',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'color': '#a5b076'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#447530'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#f5f1e6'
        }
      ]
    },
    {
      'featureType': 'road',
      'elementType': 'labels.icon',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'road.arterial',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#fdfcf8'
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#f8c967'
        }
      ]
    },
    {
      'featureType': 'road.highway',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#e9bc62'
        }
      ]
    },
    {
      'featureType': 'road.highway.controlled_access',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#e98d58'
        }
      ]
    },
    {
      'featureType': 'road.highway.controlled_access',
      'elementType': 'geometry.stroke',
      'stylers': [
        {
          'color': '#db8555'
        }
      ]
    },
    {
      'featureType': 'road.local',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#806b63'
        }
      ]
    },
    {
      'featureType': 'transit',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'transit.line',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#dfd2ae'
        }
      ]
    },
    {
      'featureType': 'transit.line',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#8f7d77'
        }
      ]
    },
    {
      'featureType': 'transit.line',
      'elementType': 'labels.text.stroke',
      'stylers': [
        {
          'color': '#ebe3cd'
        }
      ]
    },
    {
      'featureType': 'transit.station',
      'elementType': 'geometry',
      'stylers': [
        {
          'color': '#dfd2ae'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'color': '#b9d3c2'
        }
      ]
    },
    {
      'featureType': 'water',
      'elementType': 'labels.text.fill',
      'stylers': [
        {
          'color': '#92998d'
        }
      ]
    }
  ];



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
