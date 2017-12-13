import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload';



import { AppComponent } from './app.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent } from './pages/create/create.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AboutComponent } from './pages/about/about.component';
import { SuccessComponent } from './pages/success/success.component';

// Components
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EventShortComponent } from './components/event-short/event-short.component';
import { ListComponent } from './components/list/list.component';
import { OrganizerDetailsComponent } from './components/organizer-details/organizer-details.component';
import { EventLongComponent } from './components/event-long/event-long.component';

// Services
import { AuthService} from './services/auth.service';
import { EventService } from './services/event.service';

// Guards
import { RequireAuthGuard } from './guards/require-auth-guard.service';
import { RequireAnonGuard } from './guards/require-anon-guard.service';
import { MapComponent } from './components/map/map.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent, pathMatch: 'full' },
  /* { path: 'event', component: EventComponent, pathMatch: 'full' }, */
  { path: 'about',  component: AboutComponent, pathMatch: 'full' },
  { path: 'home/event/:id', redirectTo: 'event/:id', pathMatch: 'full' },
  { path: 'event/:id', component: EventComponent, pathMatch: 'full' },
  { path: 'success', component: SuccessComponent, pathMatch: 'full'},
  { path: 'auth/signup', canActivate: [RequireAnonGuard], component: SignupComponent, pathMatch: 'full' },
  { path: 'auth/login', canActivate: [RequireAnonGuard], component: LoginComponent, pathMatch: 'full' },
  { path: 'create', /* canActivate: [RequireAuthGuard], */ component: CreateComponent, pathMatch: 'full'},
  { path: 'profile', /*  canActivate: [RequireAuthGuard], */ component: ProfileComponent, pathMatch: 'full'}
  /* { path: 'auth/signup', canActivate: [RequireAnonGuard], component: SignupComponent, pathMatch: 'full' },
  { path: 'auth/login', canActivate: [RequireAnonGuard], component: LoginComponent, pathMatch: 'full' } */


];


@NgModule({
  declarations: [
    AppComponent,
    EventComponent,
    SignupComponent,
    LoginComponent,
    CreateComponent,
    ProfileComponent,
    HomeComponent,
    WelcomeComponent,
    EventShortComponent,
    ListComponent,
    OrganizerDetailsComponent,
    EventLongComponent,
    MapComponent,
    AboutComponent,
    SuccessComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCG63miEB6h3fKfBJIYU40h4xSCtEgI8Xk',
      libraries: ['places']
    }),
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    FileUploadModule
  ],
  providers: [
    AuthService,
    EventService,
    RequireAuthGuard,
    RequireAnonGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
