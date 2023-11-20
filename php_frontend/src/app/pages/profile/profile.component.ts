import { Component } from '@angular/core';
import { CredentialService } from '../../services/credential.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(public credentialService: CredentialService){    
  }

  environment = environment;
}
