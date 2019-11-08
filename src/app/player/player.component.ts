import { Component, OnInit, HostListener, ViewChild, ElementRef, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { videoElem } from '../music-player/music-player.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  

  
  @Input() playerQueue:Array<videoElem>;
  @Input() currentIndex;

  @Output() onIndexChange:EventEmitter<any>=new EventEmitter();

  OnIndChanges(){
      console.log(this.currentIndex);
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


  constructor() { }

  
  ngOnInit() {
    
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
     if(this.playerQueue.length==0){
       this.currentIndex=-1;
       this.OnIndChanges();
    }
    else{
      console.log("load1");
      this.currentIndex=0;
      this.OnIndChanges();
      this.player.loadVideoById(this.playerQueue[0].videoId);
      this.pause();
    }
    
    }

    play(){
      console.log(this.player.getPlayerState);
      if(this.playerQueue.length==0){
        return;
      }
      if(this.currentIndex==-1){
        console.log("load2");
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
        if(this.playerQueue.length==0){
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
      if(this.playerQueue.length==0){
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
    console.log('player state', event);
    if(event.data==0){
      this.next();
    }
    if(event.data==2 && !this.paused){
      this.play();
    }
  }

}
