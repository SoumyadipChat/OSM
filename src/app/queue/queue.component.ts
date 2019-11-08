import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MusicDataFetcher } from '../services/musicDataFetcher.service';
import { DataFetcher } from '../services/DataFetcher.service';


@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  providers:[MusicDataFetcher,DataFetcher]
})
export class QueueComponent implements OnInit {

  @Input() playerQueue;
  @Input() currentIndex;

  constructor(private musicDataFetcher:MusicDataFetcher) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    //console.log(event);
    if(event.previousIndex==this.currentIndex){
      return;
    }
    if(event.previousIndex>this.currentIndex && event.currentIndex<=this.currentIndex){
      this.currentIndex++;
    }
    else if(event.previousIndex<this.currentIndex && event.currentIndex>=this.currentIndex){
      this.currentIndex--;
    }
    moveItemInArray(this.playerQueue, event.previousIndex, event.currentIndex);
  }

  remSong(index){
    console.log(this.playerQueue[index]);
    if(sessionStorage.getItem('loggedIn') && sessionStorage.getItem('loggedIn')=='true'){
      let user=sessionStorage.getItem('username')?sessionStorage.getItem('username'):'Guest';
      if(user!='Guest'){
        let videoElem=this.playerQueue[index];
        this.musicDataFetcher.deleteSong(videoElem).subscribe(data=>{
          console.log(data);
        });
      }
    }
    this.playerQueue.splice(index,1);
  }

}
