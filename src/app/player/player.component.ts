import { Component, OnInit, HostListener, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  
  player: YT.Player;
  private id: string = '';
  private videoHgt:number;
  private videoWdt:number;
  private thumbnail:string;
  @ViewChild("outpt", {read: ElementRef,static:false}) outpt: ElementRef;

  showYoutube:boolean=false;

  @Input() playerQueue;
  @Input() currentIndex;
  

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
    
    //console.log('player instance', player)
    }

    play(){
      console.log(this.player,"play",this.id);
      if(this.id==''){
        this.player.loadVideoById(this.playerQueue[0].id);
      }
      this.player.playVideo();
    }
    pause(){
      this.player.pauseVideo();
    }
  onStateChange(event){
    console.log('player state', event);
  }

}
