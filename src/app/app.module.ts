import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent } from './pages/create/create.component';
import { ProfileComponent } from './pages/profile/profile.component';

// Services
import { AuthService} from './services/auth.service';
import { EventService } from './services/event.service';

// Guards
import { RequireAuthGuard } from './guards/require-auth-guard.service';
import { RequireAnonGuard } from './guards/require-anon-guard.service';

// Components
import { WelcomeComponent } from './components/welcome/welcome.component';
import { EventShortComponent } from './components/event-short/event-short.component';
import { ListComponent } from './components/list/list.component';
import { OrganizerDetailsComponent } from './components/organizer-details/organizer-details.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent, pathMatch: 'full' },
  /* { path: 'event', component: EventComponent, pathMatch: 'full' }, */
  { path: 'event/:id', component: EventComponent, pathMatch: 'full'},
  { path: 'auth/signup', component: SignupComponent, pathMatch: 'full' },
  { path: 'auth/login', component: LoginComponent, pathMatch: 'full' }
  /* { path: 'auth/signup', canActivate: [RequireAnonGuard], component: SignupComponent, pathMatch: 'full' },
  { path: 'auth/login', canActivate: [RequireAnonGuard], component: LoginComponent, pathMatch: 'full' } */

  /* Continue adding routes signup, login, create and profile */
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
    OrganizerDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
