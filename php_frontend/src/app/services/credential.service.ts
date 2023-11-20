import { Injectable } from '@angular/core';

import * as jose from 'jose'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {

  constructor() {
    const value = localStorage.getItem(environment.LOCAL_STORAGE_IS_LOGGED);
    this.#isLogged = value == environment.LOCAL_STORAGE_TRUE_VALUE;
    this.#user = JSON.parse(localStorage.getItem(environment.LOCAL_STORAGE_USER) ?? environment.LOCAL_STORAGE_EMPTY_PAYLOAD_VALUE);
    this.#token = localStorage.getItem(environment.LOCAL_STORAGE_TOKEN) ?? environment.LOCAL_STORAGE_EMPTY_STRING_VALUE;
  }

  #isLogged :boolean;

  #user: any;

  #token: string;

  set isLogged(value: boolean) {
    this.#isLogged = value;
    localStorage.setItem(environment.LOCAL_STORAGE_IS_LOGGED, `${value}`);
  }

  get isLogged() {
    return this.#isLogged;
  }

  set user(value: any) {
    const decoded =jose.decodeJwt(value);
    this.#token = value;
    this.#user = decoded;
    localStorage.setItem(environment.LOCAL_STORAGE_TOKEN, this.#token);
    localStorage.setItem(environment.LOCAL_STORAGE_USER, JSON.stringify(decoded));
  }

  get user() {
    return this.#user;
  }

  get token() {
    return this.#token;
  }

  logout() {
    this.#isLogged = false;
    localStorage.clear();
  }

}
