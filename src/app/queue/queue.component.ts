import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MusicDataFetcher } from '../services/musicDataFetcher.service';
import { DataFetcher } from '../services/DataFetcher.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { screenSizeState } from '../services/screen-size.service';

export interface DialogData {
  title: string;
  returnVal: boolean;
}


@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
  providers:[MusicDataFetcher,DataFetcher]
})
export class QueueComponent implements OnInit {

  @Input() playerQueue;
  @Input() currentIndex;

  expanded=false;
  showExpand=true;
  isClosed=true;

  playlists=[
    {
      id:1,
      name:'Default',
      isDefault:'Y'
    },
    {
      id:1,
      name:'WWWWWWWWWW',
      isDefault:'Y'
    },
    {
      id:1,
      name:'Default',
      isDefault:'Y'
    },{
      id:1,
      name:'Default',
      isDefault:'Y'
    },{
      id:1,
      name:'Default',
      isDefault:'Y'
    }
  ]
  selectedPlaylist={
    id:1,
    name:'Default',
    isDefault:'Y'
  };

  cantAddplayList=true;

  selectedValue='Default';

  @Output() onIndexChange:EventEmitter<any>=new EventEmitter();
  @Output() onDoubleClic:EventEmitter<number>=new EventEmitter();
  @Output() onExpCollapse:EventEmitter<boolean>=new EventEmitter();

  touchtime=0;

  OnIndChanges(){
      //console.log(this.currentIndex);
      this.onIndexChange.emit(this.currentIndex);
  }

  constructor(private musicDataFetcher:MusicDataFetcher,public dialog: MatDialog,private screenState:screenSizeState) { }

  ngOnInit() {
    this.screenState.screenSize.subscribe(screen=>{
      if(!screen.isMobile){
          this.expanded=true;
          this.showExpand=false;
          this.onExpandCollapse();
      }
      else{
        this.showExpand=true;
      }
     })
  }

  onExpandCollapse(){
      this.expanded=!this.expanded;
      this.onExpCollapse.emit(this.expanded);
  }

  drop(event: CdkDragDrop<string[]>) {
    //console.log(event);
    if(event.previousIndex==this.currentIndex){
      return;
    }
    if(event.previousIndex>this.currentIndex && event.currentIndex<=this.currentIndex){
      this.currentIndex++;
      this.OnIndChanges();
    }
    else if(event.previousIndex<this.currentIndex && event.currentIndex>=this.currentIndex){
      this.currentIndex--;
      this.OnIndChanges();
    }
    moveItemInArray(this.playerQueue, event.previousIndex, event.currentIndex);
  }

  remSong(index){

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {title: this.playerQueue[index].title, animal: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      if(result && result.returnVal){
        if(sessionStorage.getItem('loggedIn') && sessionStorage.getItem('loggedIn')=='true'){
          let user=sessionStorage.getItem('username')?sessionStorage.getItem('username'):'Guest';
          if(user!='Guest'){
            let videoElem=this.playerQueue[index];
            this.musicDataFetcher.deleteSong(videoElem).subscribe(data=>{
              console.log(data);
            });
          }
        }
        if(index<this.currentIndex){
          this.currentIndex--;
          this.OnIndChanges();
        }
        this.playerQueue.splice(index,1);
      }
    });
  

    
  }

  playSong(index){
    if (this.touchtime == 0) {
      // set first click
      this.touchtime = new Date().getTime();
  } else {
      // compare first click to this click and see if they occurred within double click threshold
      if (((new Date().getTime()) - this.touchtime) < 800) {
          // double click occurred
          this.onDoubleClic.emit(index);
          this.touchtime = 0;
      } else {
          // not a double click so set as a new first click
          this.touchtime = new Date().getTime();
      }
  }
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {

  response:DialogData={
    title:'',
    returnVal:true
  }

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    ngOnInit(){
      this.response.title=this.data.title;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
