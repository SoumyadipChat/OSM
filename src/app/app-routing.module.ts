import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LauncherComponent } from './launcher/launcher.component';
import { DemoComponent } from './Demo/demo.component';


const routes: Routes = [
  { path: 'music', component: MusicPlayerComponent},
  {path: 'demo', component:DemoComponent},
  {path: 'login', component:SignUpComponent},
  {path: '', component:LauncherComponent},
  { path: '', redirectTo: 'launch', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
