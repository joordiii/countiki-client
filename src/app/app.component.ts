import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from './services/auth.service';

import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  user: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.userChange$.subscribe((user) => {
      this.user = user;
    });
  }

  clickLogout() {
    this.authService.logout()
    .subscribe(
      () => this.router.navigate(['/home'])
    );
  }

}
