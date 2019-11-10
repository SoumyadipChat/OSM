import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { YoutubePlayerModule } from 'ng2-youtube-player';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { HeaderComponent, LogoutConfirmDialog } from './header/header.component';
import { MusicAddComponent } from './music-add/music-add.component';
import { QueueComponent, DialogOverviewExampleDialog } from './queue/queue.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule,MatInputModule,MatButtonModule, MatIconModule, MatDialogModule, MatRadioModule, MatCheckboxModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {TextFieldModule} from '@angular/cdk/text-field';
import {DragDropModule } from '@angular/cdk/drag-drop'
import { HttpClientModule } from '@angular/common/http';
import { LauncherComponent } from './launcher/launcher.component';
import { YouTubeSearchService } from './services/youtube-search.service';
import { YouTubeServiceInjectables } from './services/youtube-search.injectables';
import { ModalCompComponent } from './modal-comp/modal-comp.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    HeaderComponent,
    MusicAddComponent,
    QueueComponent,
    MusicPlayerComponent,
    ButtonsComponent,
    SignUpComponent,
    LauncherComponent,
    ModalCompComponent,
    DialogOverviewExampleDialog,
    LogoutConfirmDialog 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    YoutubePlayerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TextFieldModule,
    MatIconModule,
    DragDropModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule
  ],
  providers: [YouTubeSearchService, YouTubeServiceInjectables],
  bootstrap: [AppComponent],
  entryComponents:[ModalCompComponent,DialogOverviewExampleDialog,LogoutConfirmDialog]
})
export class AppModule { }
