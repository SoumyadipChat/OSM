import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { HeaderComponent } from './header/header.component';
import { MusicAddComponent } from './music-add/music-add.component';
import { QueueComponent } from './queue/queue.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule,MatInputModule,MatButtonModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HeaderComponent,
    MusicAddComponent,
    QueueComponent,
    MusicPlayerComponent,
    ButtonsComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YoutubePlayerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
