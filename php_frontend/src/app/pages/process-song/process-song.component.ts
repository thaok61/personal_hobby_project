import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumDataService } from '../../services/album-data.service';
import { SongDataService } from '../../services/song-data.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-process-song',
  templateUrl: './process-song.component.html',
  styleUrls: ['./process-song.component.css']
})
export class ProcessSongComponent {
  processSongForm: FormGroup;
  albumId: string;
  songId: string;
  showErrorMsg = false;
  environment = environment;

  constructor(private _router: Router,
    _formBuilder: FormBuilder,
    private _songDataService: SongDataService,
    _activatedRoute: ActivatedRoute) {
    this.processSongForm = _formBuilder.group({
      title: "",
      length: "",
    });
    this.albumId = _activatedRoute.snapshot.params["albumId"];
    this.songId = _activatedRoute.snapshot.params["songId"];
  }
  ngOnInit(): void {
    if (this.songId) {
      this._songDataService.getSong(this.albumId, this.songId).subscribe({
        next: (res) => {
          this.processSongForm.controls["title"].setValue(res.data.title);
          this.processSongForm.controls["length"].setValue(res.data.length);
        }
      })
    }
  }

  addSong() {
    this._songDataService.addSong(this.albumId,this.processSongForm.value).subscribe({
      next: (msg) => {
        this._router.navigate([`/album/${this.albumId}`]);
      },
      error: (err) => {
        this.showErrorMsg = true;
        setTimeout(() => {
          this.showErrorMsg = false;
        }, 3000); 
      }
    })
  }

  updateSong() {
    this._songDataService.updateSong(this.albumId, this.songId, this.processSongForm.value).subscribe({
      next: (msg) => {
        this._router.navigate([`/album/${this.albumId}`]);
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
    if (this.songId) {
      this.updateSong();
    } else {
      this.addSong();
    }
  }
}
