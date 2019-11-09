import { Component, OnInit, HostListener, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { videoElem } from '../music-player/music-player.component';
import { screenSizeState } from '../services/screen-size.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  
  screenSt;
  
  @Input() playerQueue:Array<videoElem>=[];
  @Input() currentIndex;

  @Output() onIndexChange:EventEmitter<any>=new EventEmitter();

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
  paused:boolean=true;
  repeatOn:boolean=false;
  isMinimized:boolean=false;
  queInitilized:boolean=false;


  constructor(private screenState:screenSizeState) { }
  
  ngOnInit() {
    this.screenState.screenSize.subscribe(scrSz=>{
        this.screenSt=scrSz;
    });
    window.addEventListener('visibilitychange', this.myPageHideListenerFunc, false);
  }

  myPageHideListenerFunc($event){
    this.isMinimized=!this.isMinimized;
    if(!this.paused && this.isMinimized){
      this.player.playVideo();
    }
  }


  

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    
    this.videoHgt=this.outpt.nativeElement.offsetHeight;
    this.videoWdt=this.outpt.nativeElement.offsetWidth;
    this.player.setSize(this.videoWdt,this.videoHgt);
   }
  
 
    savePlayer (player) {
    this.player = player;
    this.videoHgt=this.outpt.nativeElement.offsetHeight;
    this.videoWdt=this.outpt.nativeElement.offsetWidth;
    this.player.setSize(this.videoWdt,this.videoHgt);
    let timer=this.queInitilized?0:2000;
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
      }
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
        return;
      }
      this.player.playVideo();
      this.paused=false;
    }

    pause(){
      this.paused=true;
      this.player.pauseVideo();
    }

    next(){
        if(this.playerQueue.length==0 || (this.currentIndex==this.playerQueue.length-1 && !this.repeatOn)){
          return;
        }
        if(this.currentIndex==-1){
          this.currentIndex++;
        }
        this.currentIndex=this.currentIndex+1==this.playerQueue.length?0:this.currentIndex+1;
        this.OnIndChanges();
        this.player.loadVideoById(this.playerQueue[this.currentIndex].videoId);
        if(this.paused){
          this.pause();
        }
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
      }
    }
  onStateChange(event){
    //console.log('player state', event);
    if(event.data==0){
      this.next();
    }
  }

}
