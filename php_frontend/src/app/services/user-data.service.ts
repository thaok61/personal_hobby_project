import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private _httpClient: HttpClient) { }

  private BASE_URL = environment.BASE_USER_URL;

  register(user:any) {
    const url = this.BASE_URL + `/register`;
    return this._httpClient.post<any>(url, user);
  }

  login(user:any) {
    const url = this.BASE_URL + `/login`;
    return this._httpClient.post<any>(url, user);
  }
}
