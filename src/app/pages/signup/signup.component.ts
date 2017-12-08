import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

    user = null;

    dataForm = {
      organizationName: '',
      myAddress: '',
      myTelephone: '',
      myEmail: '',
      myWeb: '',
      username: '',
      password: '',
      photo: ''
    };

    error: String;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
      this.user = this.authService.getUser();
    }

    signUpClick() {
      console.log(this.dataForm);
      this.authService.signup(this.dataForm)
        .subscribe(
          () => this.router.navigate(['/home']),
          (err) => this.error = err);
    }

  }
