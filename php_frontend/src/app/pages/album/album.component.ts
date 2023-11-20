import { Component, OnInit } from '@angular/core';
import { AlbumDataService } from '../../services/album-data.service';
import { ActivatedRoute } from '@angular/router';
import { SongDataService } from '../../services/song-data.service';
import { CredentialService } from '../../services/credential.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  id: string;
  album: any = {};
  songs = <any>[];
  offset = 0;

  constructor(
    private _albumDataService: AlbumDataService,
    _activatedRoute: ActivatedRoute,
    private _songDataService: SongDataService,
    public credentialService: CredentialService
  ) {
    this.id = _activatedRoute.snapshot.params["albumId"];
  }
  public environment = environment;

  ngOnInit(): void {
    this.getAlbum();
    this.getSongs();
  }

  getAlbum() {
    this._albumDataService.getAlbumById(this.id).subscribe({
      next: (res) => {
        this.album = res.data;
      }
    })
  }

  getSongs() {
    this._songDataService.getSongs(this.id, this.offset).subscribe({
      next: (res) => {
        this.songs = res.data;
      }
    })
  }

  deleteSong(songId: string) {
    this._songDataService.deleteSong(this.id, songId).subscribe({
      next: (res) => {
        this.songs = this.songs.filter((song:any) => song._id != songId);
      }
    })
  }

  next() {
    this.offset++;
    this.getSongs();
  }

  prev() {
    this.offset--;
    this.getSongs();
  }

  isLast() {
    return this.songs.length < 5;
  }

  isFirst() {
    return this.offset == 0;
  }
}
