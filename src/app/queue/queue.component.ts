import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss']
})
export class QueueComponent implements OnInit {

  @Input() playerQueue;
  @Input() currentIndex;

  constructor() { }

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

}
