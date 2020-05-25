import { Component, OnInit, HostListener, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges, NgZone } from '@angular/core';
import { videoElem } from '../music-player/music-player.component';
import { screenSizeState } from '../services/screen-size.service';
import { Observable, interval } from 'rxjs';
import { max } from 'rxjs/operators';
import {
  OnPageVisible, OnPageHidden,
  OnPageVisibilityChange,
  AngularPageVisibilityStateEnum,
  OnPagePrerender, OnPageUnloaded} from 'angular-page-visibility';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  
})
export class PlayerComponent implements OnInit{
  
  screenSt;
  initializing:boolean=true;
  
  @Input() playerQueue:Array<videoElem>=[];
  @Input() currentIndex;
  @Input() queExpanded;

  elapsedTime=0;
  songTime=300;
  loadedTime=0;
  loading=false;
  
  sub;

  @Output() onIndexChange:EventEmitter<any>=new EventEmitter();

  @OnPageHidden()
  logWhenPageHidden (): void {
    if(this.playerState==1){
      this.player.playVideo();
    }
  }

  OnIndChanges(){
      this.onIndexChange.emit(this.currentIndex);
  }
  
  player: YT.Player;
  private id: string = '';
  private videoHgt:number;
  private videoWdt:number;
  private thumbnail:string;
  @ViewChild("outpt", {read: ElementRef,static:false}) outpt: ElementRef;


  showYoutube:boolean=false;
  paused=true;
  repeatOn:number=1;
  shuffleOn:boolean=false;
  isMinimized:boolean=false;
  queInitilized:boolean=false;
  minimizedCall:boolean=false;
  val;

  playerState;
  imgStyle;
  loaderStyle;

  hdQuality=true;

  volTimeOut

  showVolSLider=false;
  volume=4;
  volumeicons=[
    'mute',
    'one',
    'one',
    'two',
    'two'
 ]

 @Input() largePlayer=false;
 @Output() onLargePlayerChange:EventEmitter<boolean>=new EventEmitter();


  constructor(private screenState:screenSizeState,private zone: NgZone) {

    window['angularComponentReference'] = {
      zone: zone,
      playFn: () => this.play(),
      pauseFn:()=>this.pause(),
      nextFn:()=>this.next(),
      prevFn:()=>this.previous(),
      titleFn:()=>this.getTitle(),
      showPLFn:()=>this.showPL(),
      showLargePlayer:()=>this.largePlayerChange(),
      component: this,
  };


   }
  
  ngOnInit() {
    this.screenState.screenSize.subscribe(scrSz=>{
        this.screenSt=scrSz;
        let boxSize=Math.min(scrSz.width,scrSz.height/1.5)
        this.imgStyle={
          'width':boxSize*0.5+'px',
          'height':boxSize*0.5+'px',
          'border-radius':'15px',
          'box-shadow': '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
        }
        
    });
    if(localStorage.getItem('repeatOpn')=='0' || localStorage.getItem('repeatOpn')=='1' || localStorage.getItem('repeatOpn')=='2'){
      this.repeatOn=JSON.parse(localStorage.getItem('repeatOpn'));
    }
    
  }

  getTitle(){
      return this.currentIndex>=0?this.playerQueue[this.currentIndex].title:'';
  }

  @HostListener('window:pagehide',['$event'])
  onMinimize(event){
    console.log("blurred");
    this.val=1;
  }
  

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    
    this.videoHgt=this.outpt.nativeElement.offsetHeight;
    this.videoWdt=this.outpt.nativeElement.offsetWidth;
    this.player.setSize(this.videoWdt,this.videoHgt);
   }

   onSLiderChange(seekerTime?){
    //  clearInterval(this.sub);
     seekerTime=seekerTime!=undefined?seekerTime:this.elapsedTime;
     if(this.paused){
      this.player.seekTo(seekerTime,true);
      // this.startIntervalTimer();
      return;
     }
     this.player.pauseVideo();
     console.log(seekerTime);
     this.player.seekTo(seekerTime,true);
     this.player.playVideo();
    //  this.startIntervalTimer();
     this.paused=false;
   }

   largePlayerChange(){
    let largeState=this.largePlayer?"small":"large";
     console.log("largePlayer|"+largeState);
     this.largePlayer=!this.largePlayer;
     this.onLargePlayerChange.emit(this.largePlayer);
   }

   onVolChange(){
     this.player.setVolume(this.volume*25);
   }

   showPL(){
     if(this.largePlayer){
       this.largePlayerChange();
     }
   }

   volToggle(){
     if(this.volTimeOut){
       clearTimeout(this.volTimeOut);
     }
     this.showVolSLider=!this.showVolSLider;
     this.volTimeOut=setTimeout(()=>{
       this.showVolSLider=false;
     },5000);
   }

   startIntervalTimer(){
    this.sub = setInterval(()=> {
      this.elapsedTime=this.player.getCurrentTime();
      this.songTime=this.player.getDuration();
      this.loadedTime=this.player.getVideoLoadedFraction()*this.songTime;
      if(this.playerState==2 && this.loadedTime<=this.elapsedTime){
        this.loading=true;
      }
    },1000);
   }
  
 
    savePlayer (player) {
      this.player = player;
      this.videoHgt=this.outpt.nativeElement.offsetHeight;
      this.videoWdt=this.outpt.nativeElement.offsetWidth;
      this.player.setSize(70,100);
      this.player.setPlaybackQuality("medium");
      this.startIntervalTimer();
      this.initializing=true;
      this.initialize();
    }

    initialize(){
      setTimeout(()=>{
        if(!this.playerQueue){
          this.initialize();
          return;
        }
        if(this.playerQueue.length==0){
          if(this.screenSt.isMobile){
            this.largePlayerChange();
          }
          this.currentIndex=-1;
          this.OnIndChanges();
        }
        else{
          this.currentIndex=this.currentIndex>0?this.currentIndex:0;
          this.OnIndChanges();
          this.player.loadVideoById(this.playerQueue[this.currentIndex].videoId);
          this.pause();
          console.log(this.paused);
        }
      this.initializing=false;
      },1000);
    }

    queueInitializer(){
      this.queInitilized=true;
    }

    
    playIndexNumber(index){
      this.player.loadVideoById(this.playerQueue[index].videoId);
        this.currentIndex=index;
        this.OnIndChanges();
        this.paused=false;
        setTimeout(()=>{
          if(this.playerState==-1){
            this.next();
          }
        },5000);
    }


    play(){
      //console.log(this.player.getPlayerState);
      if(this.playerQueue.length==0){
        return;
      }
      if(this.currentIndex==-1){
        this.player.loadVideoById(this.playerQueue[0].videoId);
        this.currentIndex=0;
        this.OnIndChanges();
        this.paused=false;
        setTimeout(()=>{
          if(this.playerState==-1){
            this.next();
          }
        },5000);
        return;
      }
      this.player.playVideo();
      this.paused=false;
      setTimeout(()=>{
        if(this.playerState==-1){
          this.next();
        }
      },5000);
    }

    pause(){
      this.paused=true;
      console.log(this.paused);
      this.player.pauseVideo();
    }

    changeRep(){
      this.repeatOn=(this.repeatOn+1)%3;
      localStorage.setItem('repeatOpn',JSON.stringify(this.repeatOn));
    }

    next(){
        if(this.playerQueue.length==0 || (this.currentIndex==this.playerQueue.length-1 && this.repeatOn==0)){
          return;
        }
        if(this.repeatOn==2){
          this.onSLiderChange(0);
          return;
        }
        if(this.currentIndex==-1){
          this.currentIndex++;
        }
        if(this.shuffleOn){
          let index=Math.floor(Math.random()*(this.playerQueue.length));
          let index2=Math.floor(Math.random()*(this.playerQueue.length-1));
          this.currentIndex=(index==this.currentIndex)?(index+index2)%this.playerQueue.length:index;
        }
        else{
          this.currentIndex=this.currentIndex+1==this.playerQueue.length?0:this.currentIndex+1;
        }
        this.OnIndChanges();
        this.player.loadVideoById(this.playerQueue[this.currentIndex].videoId);
        if(this.paused){
          this.pause();
          return;
        }
        setTimeout(()=>{
          if(this.playerState==-1){
            this.next();
          }
        },5000);
    }

    previous(){
      if(this.playerQueue.length==0 || (this.currentIndex==0 && this.repeatOn==0)){
        return;
      }
      if(this.repeatOn==2 || this.elapsedTime>10){
        this.onSLiderChange(0);
        return;
      }
      if(this.currentIndex==-1){
        this.currentIndex++;
      }
      this.currentIndex=this.currentIndex==0?this.playerQueue.length-1:this.currentIndex-1;
      this.OnIndChanges();
      this.player.loadVideoById(this.playerQueue[this.currentIndex].videoId);
      if(this.paused){
        this.pause();
        return;
      }
      setTimeout(()=>{
        if(this.playerState==-1){
          this.next();
        }
      },5000);
    }

    
  onStateChange(event){
   setTimeout(()=>{
    this.playerState=event.data;
   },200); 
    console.log('playerState|'+event.data);
    console.log('SongTitle|'+this.getTitle());
    console.log('SongId|'+this.playerQueue[this.currentIndex].videoId);
    if(event.data==0){
      this.next();
    }
    if(event.data==2){
      this.paused=true;
    }
    if(event.data==1){
      this.paused=false;
    }
   
  }

  hdToggle(){
      this.hdQuality=!this.hdQuality;
      if(this.hdQuality){
        this.player.setPlaybackQuality("hd720");
        console.log(this.player.getPlaybackQuality());
      }
      else{
        this.player.setPlaybackQuality("small");
        console.log(this.player.getPlaybackQuality());
      }
  }

}
