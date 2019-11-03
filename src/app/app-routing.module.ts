import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicPlayerComponent } from './music-player/music-player.component';


const routes: Routes = [
  { path: 'music', component: MusicPlayerComponent},
  { path: '', redirectTo: 'music', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
