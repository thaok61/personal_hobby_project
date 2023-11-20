import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlbumDataService } from '../../services/album-data.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-process-album',
  templateUrl: './process-album.component.html',
  styleUrls: ['./process-album.component.css']
})
export class ProcessAlbumComponent implements OnInit{
  processAlbumForm: FormGroup;
  albumId: string;
  showErrorMsg = false;
  message = "";
  environment = environment;

  constructor(private _router: Router,
    _formBuilder: FormBuilder,
    private _albumDataService: AlbumDataService,
    _activatedRoute: ActivatedRoute) {
    this.processAlbumForm = _formBuilder.group({
      title: "",
      year: "",
      image: ""
    });
    this.albumId = _activatedRoute.snapshot.params["albumId"];
  }
  ngOnInit(): void {
    if (this.albumId) {
      this._albumDataService.getAlbumById(this.albumId).subscribe({
        next: (res) => {
          this.processAlbumForm.controls["title"].setValue(res.data.title);
          this.processAlbumForm.controls["year"].setValue(res.data.year);
          this.processAlbumForm.controls["image"].setValue(res.data.image);
        }
      })
    }
  }

  addAlbum() {
    this._albumDataService.addAlbum(this.processAlbumForm.value).subscribe({
      next: (msg) => {
        this._router.navigate(["/albums"]);
      },
      error: (err) => {
        this.showErrorMsg = true;
        setTimeout(() => {
          this.showErrorMsg = false;
        }, 3000); 
      }
    })
  }

  updateAlbum() {
    this._albumDataService.updateAlbum(this.albumId, this.processAlbumForm.value).subscribe({
      next: (msg) => {
        this._router.navigate(["/albums"]);
      },
      error: (err) => {
        this.showErrorMsg = true;
        setTimeout(() => {
          this.showErrorMsg = false;
        }, 3000); 
      }
    })
  }

  onSubmit() {
    if (this.albumId) {
      this.updateAlbum();
    } else {
      this.addAlbum();
    }
  }
}
