import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core'
import { CredentialService } from '../services/credential.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _credentialService = inject(CredentialService);
  return _credentialService.isLogged;
};


export const deActivateGuard: CanActivateFn = (route, state) => {
  const _credentialService = inject(CredentialService);
  return !_credentialService.isLogged;
};