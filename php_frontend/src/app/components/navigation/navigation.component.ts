import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../services/user-data.service';
import { NgForm } from '@angular/forms';
import { CredentialService } from '../../services/credential.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(
    private _router: Router,
    public activatedRoute: ActivatedRoute,
    public userDataService: UserDataService,
    public credentialService: CredentialService
  ) { }

  showSuccessMsg = false;
  showFailMsg = false;

  public environment = environment;

  onLogin(form: NgForm) {
    this.showFailMsg = false;
    this.showSuccessMsg = false;
    this.userDataService.login(form.value).subscribe({
      next: (res) => {
        this._router.navigate(["/"]);
        this.credentialService.isLogged = true;
        this.showSuccessMsg = true;
        this.credentialService.user = res.token;

        setTimeout(() => {
          this.showSuccessMsg = false;
        }, 3000);
      },
      error: (err) => {
        this.credentialService.isLogged = false;
        this.showFailMsg = true;
        setTimeout(() => {
          this.showFailMsg = false;
        }, 3000);
      },
    })
  }

  onLogout() {
    this._router.navigate(["/"]);
    this.credentialService.logout();
  }

}
