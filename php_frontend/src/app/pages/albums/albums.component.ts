import { Component, OnInit } from '@angular/core';
import { AlbumDataService } from '../../services/album-data.service';
import { CredentialService } from '../../services/credential.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit{
  albums = <any>[];
  offset = 0;
  constructor(private _albumDataService: AlbumDataService, public credentialService: CredentialService){}
  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this._albumDataService.getAllAlbums(this.offset).subscribe({
      next: (res) => {
        this.albums = res.data;
      }
    })
  }

  public environment = environment;

  deleteAlbum(id: string) {
    this._albumDataService.deleteAlbum(id).subscribe({
      next: (res) => {
        this.albums = this.albums.filter((album:any) => album._id != id);
      }
    })
  }

  isLast() {
    return this.albums.length < 5;
  }

  isFirst() {
    return this.offset == 0;
  }

  next() {
    this.offset++;
    this.getData();
  }

  prev() {
    this.offset--;
    this.getData();
  }

}
