import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SongDataService {

  constructor(private _httpClient: HttpClient) { }

  private BASE_URL = environment.BASE_ALBUM_URL;

  getSongs(albumId: string, offset = 0) {
    const url = this.BASE_URL + `/${albumId}/songs?offset=${offset}`;
    return this._httpClient.get<any>(url);
  }

  addSong(albumId: string, song: any) {
    const url = this.BASE_URL + `/${albumId}/songs`;
    return this._httpClient.post<any>(url, song);
  }

  getSong(albumId: string, songId: string) {
    const url = this.BASE_URL + `/${albumId}/songs/${songId}`;
    return this._httpClient.get<any>(url);
  }

  deleteSong(albumId: string, songId: string) {
    const url = this.BASE_URL + `/${albumId}/songs/${songId}`;
    return this._httpClient.delete<any>(url);
  }

  updateSong(albumId: string, songId: string, song: any) {
    const url = this.BASE_URL + `/${albumId}/songs/${songId}`;
    return this._httpClient.patch<any>(url, song);
  }
}
