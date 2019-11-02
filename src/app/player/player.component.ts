import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
  }

  player: YT.Player;
  private id: string = 'zdXiSlRrgWQ';
 
    savePlayer (player) {
    this.player = player;
    console.log('player instance', player)
    }

    play(){
      this.player.playVideo();
    }
  onStateChange(event){
    console.log('player state', event.data);
  }

}
