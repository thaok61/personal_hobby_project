import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './pages/albums/albums.component';
import { AlbumComponent } from './pages/album/album.component';
import { ProcessAlbumComponent } from './pages/process-album/process-album.component';
import { ProcessSongComponent } from './pages/process-song/process-song.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard, deActivateGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumComponent,
    ProcessAlbumComponent,
    ProcessSongComponent,
    NavigationComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "album/:albumId",
        component: AlbumComponent,
      },
      {
        path: "albums",
        component: AlbumsComponent,
      },
      {
        path: "album/:albumId/edit",
        component: ProcessAlbumComponent,
        canActivate: [authGuard]
      },
      {
        path: "album/:albumId/songs/add",
        component: ProcessSongComponent,
        canActivate: [authGuard]
      },
      {
        path: "album/:albumId/song/:songId/update",
        component: ProcessSongComponent,
        canActivate: [authGuard]
      },
      {
        path: "albums/add",
        component: ProcessAlbumComponent,
        canActivate: [authGuard]
      },
      {
        path: "album/:albumId",
        component: AlbumsComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
        canActivate: [deActivateGuard]
      },
      {
        path: "profile",
        component: ProfileComponent,
        canActivate: [authGuard]
      },
    ]),

  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
