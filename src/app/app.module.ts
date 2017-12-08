import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { EventComponent } from './pages/event/event.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateComponent } from './pages/create/create.component';
import { ProfileComponent } from './pages/profile/profile.component';

// Services
import { AuthService} from './services/auth.service';

// Guards
import { RequireAuthGuard } from './guards/require-auth-guard.service';
import { RequireAnonGuard } from './guards/require-anon-guard.service';
import { WelcomeComponent } from './components/welcome/welcome.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent, pathMatch: 'full' },
  { path: 'event', component: EventComponent, pathMatch: 'full' },
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
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
