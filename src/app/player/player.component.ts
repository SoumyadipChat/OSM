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
  repeatOn:boolean=true;
  shuffleOn:boolean=false;
  isMinimized:boolean=false;
  queInitilized:boolean=false;
  minimizedCall:boolean=false;
  val;

  playerState;
  imgStyle;

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
        this.imgStyle={
          'width':scrSz.width*0.5+'px',
          'height':scrSz.width*0.5+'px',
          'position':'absolute',
          'left':scrSz.width*0.25+'px',
          'border-radius':'15px',
          'box-shadow': '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'
        }
    });
    
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

   onSLiderChange(){
     if(this.paused){
      this.player.seekTo(this.elapsedTime,true);
      return;
     }
     this.player.pauseVideo();
     console.log(this.elapsedTime);
     this.player.seekTo(this.elapsedTime,true);
     this.player.playVideo();
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
  
 
    savePlayer (player) {
    this.player = player;
    this.videoHgt=this.outpt.nativeElement.offsetHeight;
    this.videoWdt=this.outpt.nativeElement.offsetWidth;
    this.player.setSize(this.videoWdt,this.videoHgt);
    let timer=2000;
    this.sub = interval(1000)
    .subscribe((val) => {
      this.elapsedTime=this.player.getCurrentTime();
      this.songTime=this.player.getDuration();
      this.loadedTime=this.player.getVideoLoadedFraction()*this.songTime;
      if(this.playerState==2 && this.loadedTime<=this.elapsedTime){
        this.loading=true;
      }
    });
    this.initializing=true;
      setTimeout(()=>{
        if(this.playerQueue.length==0){
          this.currentIndex=-1;
          this.OnIndChanges();
      }
      else{
        this.currentIndex=0;
        this.OnIndChanges();
        this.player.loadVideoById(this.playerQueue[0].videoId);
        this.pause();
        console.log(this.paused);
      }
      this.initializing=false
      },timer);
    
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

    next(){
        if(this.playerQueue.length==0 || (this.currentIndex==this.playerQueue.length-1 && !this.repeatOn)){
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
      if(this.playerQueue.length==0 || (this.currentIndex==0 && !this.repeatOn)){
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

}
