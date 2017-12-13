import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService} from '../../services/auth.service';
import { FileUploader } from 'ng2-file-upload';

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
    feedbackEnabled: boolean;
    processing: any;

    baseUrl = 'http://localhost:3000';

    uploader: FileUploader = new FileUploader({
      url: `${this.baseUrl}/auth/upload`
    });

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

          if (this.uploader.queue.length) {
            this.uploader.uploadAll();
            this.uploader.onCompleteItem = (item: any, response: string) => {
              const fileData = JSON.parse(response);
              this.user.picture = fileData.filename;
              this.signUpClick();
            };
          } else {
            this.signUpClick();
          }
    }
}
