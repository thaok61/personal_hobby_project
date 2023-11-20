import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumDataService {

  constructor(private _httpClient: HttpClient) { }

  private BASE_URL = environment.BASE_ALBUM_URL;
  getAllAlbums(offset = 0) {
    const url = this.BASE_URL + `?offset=${offset}`;

    return this._httpClient.get<any>(url);
  }

  getAlbumById(id: string) {
    const url = this.BASE_URL + `/${id}`;
    return this._httpClient.get<any>(url);
  }

  addAlbum(album: any) {
    const url = this.BASE_URL;
    return this._httpClient.post(url, album);
  }
  
  deleteAlbum(id: string) {
    const url = this.BASE_URL + `/${id}`;
    return this._httpClient.delete(url);
  }

  updateAlbum(id: string, album: any) {
    const url = this.BASE_URL + `/${id}`;
    return this._httpClient.patch(url, album);
  }
}
