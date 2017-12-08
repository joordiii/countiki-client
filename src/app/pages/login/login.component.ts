import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dataFormLogin = {
    organizationName: '',
    myAddress: '',
    myTelephone: '',
    myEmail: '',
    myWeb: '',
    username: '',
    password: '',
  };

  error: String;


  constructor(private authService: AuthService, private router: Router) { }

  user = null;

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  loginClick() {
    console.log(this.dataFormLogin);
    this.authService.login(this.dataFormLogin)
      .subscribe(
        () => this.router.navigate(['/home']),
        (err) => this.error = err);
  }

}
