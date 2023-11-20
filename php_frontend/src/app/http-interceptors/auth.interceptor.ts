import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CredentialService } from '../services/credential.service';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private credentialService: CredentialService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.credentialService.isLogged && this.credentialService.token) {
      const token = this.credentialService.token;

      const authRequest = request.clone({
        headers: request.headers.set(environment.AUTHORIZATION, `Bearer ${token}`)
      });
      return next.handle(authRequest);
    }
    
    return next.handle(request);
  }
}