import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { musicStyleService } from './musicPlayerStyle.service';
import { MusicDataFetcher } from '../services/musicDataFetcher.service';
import { DataFetcher } from '../services/DataFetcher.service';
import { PlayerComponent } from '../player/player.component';
import { MusicAddComponent } from '../music-add/music-add.component';

export interface videoElem{
  videoId:string,
  thumbnail:string,
  title:string,
  username?:string,
  id?:number
}

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  providers:[musicStyleService,MusicDataFetcher,DataFetcher]
})
export class MusicPlayerComponent implements OnInit,AfterViewInit {

  headerBarStyle;
  musicPlayerStyle;
  leftStyle;
  rightStyle;
  playerStyle;
  adderStyle;

  adderToggleShow;
  adderShow;
  expanded=false;
  lastScreenSz;

  mobileDimset=false;

  loggedInUser:string;

  @ViewChild(PlayerComponent,{read: PlayerComponent,static:false}) playrComp:PlayerComponent;

  @ViewChild(MusicAddComponent,{read: MusicAddComponent,static:false}) addrComp:MusicAddComponent;

  defplayerQueue=[
    {
      videoId:'YKcgwUg39yY',
      thumbnail:"http://img.youtube.com/vi/YKcgwUg39yY/hqdefault.jpg",
      title:'Dhadak(Title Track)'
    },
    {
      videoId:'DMRRC0rwO_I',
      thumbnail:"http://img.youtube.com/vi/DMRRC0rwO_I/hqdefault.jpg",
      title:'Khairiyat'
    },
    {
      videoId:'2kN3THdRih8',
      thumbnail:"http://img.youtube.com/vi/2kN3THdRih8/hqdefault.jpg",
      title:'Tum hi aana'
    }
  ];

  playerQueue;

  currentIndex=-1;


  constructor(private screenState:screenSizeState,private styleSetter:musicStyleService,private musicDataFetcher:MusicDataFetcher) { 

  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    
    this.screenState.screenSize.subscribe(screen=>{
      this.onScreensizeChange(screen,(screen.isMobile&&this.expanded))
     })
    if(sessionStorage.getItem('loggedIn')){
      this.loggedInUser=(sessionStorage.getItem('loggedIn')=='true' && sessionStorage.getItem('username'))?sessionStorage.getItem('username'):'Guest';
      if(this.loggedInUser!='Guest'){
        let usernm=this.loggedInUser.substring(1,this.loggedInUser.length-1);
        this.musicDataFetcher.getAllSongs(usernm).subscribe((songList)=>{
          this.playerQueue=songList;
          this.playerQueue=this.playerQueue.filter(x=>x.videoId!=null);
          });
          this.playrComp.queueInitializer();
      }
      else{
        this.playerQueue=this.defplayerQueue;
      }
  }
  }

  onExpCollapse(value){
      this.expanded=value;
      //this.leftStyle=this.styleSetter.leftStyleSetter(this.lastScreenSz,value);
      //this.rightStyle=this.styleSetter.rightStyleSetter(this.lastScreenSz,value);
      this.onScreensizeChange(this.lastScreenSz,value);
      
  }

  onScreensizeChange(scrSz:screenSize,expanded?:boolean){
    this.lastScreenSz=scrSz
    if(this.addrComp && this.addrComp.inputFocused==true){
      return;
    }
     this.adderToggleShow=scrSz.isMobile;
      this.adderShow=!scrSz.isMobile;
      this.headerBarStyle=this.styleSetter.headerStyleSetter(scrSz);
      this.musicPlayerStyle=this.styleSetter.bodyStyleSetter(scrSz);
      this.leftStyle=expanded?this.styleSetter.leftStyleSetter(scrSz,expanded):this.styleSetter.leftStyleSetter(scrSz);
      this.rightStyle=expanded?this.styleSetter.rightStyleSetter(scrSz,expanded):this.styleSetter.rightStyleSetter(scrSz);
      this.playerStyle=expanded?this.styleSetter.playerStyleSetter(scrSz,expanded):this.styleSetter.playerStyleSetter(scrSz);
      this.adderStyle=this.styleSetter.adderStyleSetter(scrSz);
     
   }

   addVideo(video){
     this.playerQueue.push(video);
   }

   playSong(index){
     this.playrComp.playIndexNumber(index);
   }

}
