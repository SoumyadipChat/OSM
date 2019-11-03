import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  
  player: YT.Player;
  private id: string = 'YKcgwUg39yY';
  private videoHgt:number;
  private videoWdt:number;
  private thumbnail:string;
  @ViewChild("outpt", {read: ElementRef,static:false}) outpt: ElementRef;

  

  constructor() { }

  
  ngOnInit() {
    
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.videoHgt=this.outpt.nativeElement.offsetHeight;
    this.videoWdt=this.outpt.nativeElement.offsetWidth;
    this.player.setSize(this.videoWdt,this.videoHgt);
    console.log(this.videoWdt,this.videoHgt);
   }
  
 
    savePlayer (player) {
    this.player = player;
    this.videoHgt=this.outpt.nativeElement.offsetHeight;
    this.videoWdt=this.outpt.nativeElement.offsetWidth;
    this.player.setSize(this.videoWdt,this.videoHgt);
    console.log(this.outpt.nativeElement.innerHTML);
    this.thumbnail="http://img.youtube.com/vi/" + this.id + "/hqdefault.jpg";
    //console.log('player instance', player)
    }

    play(){
      this.player.playVideo();
    }
    pause(){
      this.player.pauseVideo();
    }
  onStateChange(event){
    console.log('player state', event);
  }

}
