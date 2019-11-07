import { Component, OnInit } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { musicStyleService } from './musicPlayerStyle.service';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  providers:[musicStyleService]
})
export class MusicPlayerComponent implements OnInit {

  headerBarStyle;
  musicPlayerStyle;
  leftStyle;
  rightStyle;
  playerStyle;
  adderStyle;

  adderToggleShow;
  adderShow;
  constructor(private screenState:screenSizeState,private styleSetter:musicStyleService) { 

  }

  ngOnInit() {
    this.screenState.screenSize.subscribe(screen=>{
        this.onScreensizeChange(screen)
    })

  }

  onScreensizeChange(scrSz:screenSize){
      this.adderToggleShow=scrSz.isMobile;
      this.adderShow=!scrSz.isMobile;
      this.headerBarStyle=this.styleSetter.headerStyleSetter(scrSz);
      this.musicPlayerStyle=this.styleSetter.bodyStyleSetter(scrSz);
      this.leftStyle=this.styleSetter.leftStyleSetter(scrSz);
      this.rightStyle=this.styleSetter.rightStyleSetter(scrSz);
      this.playerStyle=this.styleSetter.playerStyleSetter(scrSz);
      this.adderStyle=this.styleSetter.adderStyleSetter(scrSz);
   }

}
