import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserDataService } from '../../services/user-data.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _router: Router,_formBuilder: FormBuilder,private _userDataService: UserDataService,) {
    this.registerForm = _formBuilder.group({
      username: "",
      password: "",
      rePassword: "",
      name: "",
      gender: "",
    });
  }

  registerForm: FormGroup;
  showErrorMsg = false;
  message = "";
  environment = environment;

  showMessage() {
    this.showErrorMsg = true;
        setTimeout(() => {
          this.showErrorMsg = false;
        }, 3000); 
  }
  

  onSubmit() {
    const data = this.registerForm.value;
    if (!data.username || !data.password) {
      this.message = environment.INVALID_USERNAME_PASSWORD
      this.showMessage();
      return;
    }

    if (data.password != data.rePassword) {
      this.message = environment.INVALID_RETYPE_PASSWORD
      this.showMessage();
    }
    this._userDataService.register(this.registerForm.value).subscribe({
      next: (msg) => {
        this._router.navigate(["/"]);
      },
      error: (err) => {
        this.message = environment.REGISTER_FAILED
        this.showMessage();
      }
    })
  }
}
