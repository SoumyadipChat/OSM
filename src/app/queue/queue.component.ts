import { Component, OnInit, Input, Output, EventEmitter, Inject, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MusicDataFetcher } from '../services/musicDataFetcher.service';
import { DataFetcher } from '../services/DataFetcher.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { screenSizeState } from '../services/screen-size.service';
import { videoElem } from '../music-player/music-player.component';
import { interval } from 'rxjs';
import { MusicAddComponent } from '../music-add/music-add.component';

export interface DialogData {
  title: string;
  returnVal: boolean;
  type:string;
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

  @Input() expanded=false;
  showExpand=true;
  isClosed=true;

  @Input() playlists=[];
  @Input() defaultPlaylist;
  @Input() selectedPlaylist=0;
  @Input() addable=false;
 

  cantAddplayList=true;

  hideSearch=true;

  selectedValue='Default';

  @ViewChild('divToScroll', {read: ElementRef,static:false}) divToScroll: ElementRef;
  @ViewChild(MusicAddComponent,{read: MusicAddComponent,static:false}) addrComp:MusicAddComponent;

  @Output() onIndexChange:EventEmitter<any>=new EventEmitter();
  @Output() onDoubleClic:EventEmitter<number>=new EventEmitter();
  @Output() onExpCollapse:EventEmitter<boolean>=new EventEmitter();
  @Output() onAddPlaylist:EventEmitter<{title:string,isDefault:boolean}>=new EventEmitter();
  @Output() onModifyPlaylist:EventEmitter<{index:number,title:string,isDefault:boolean}>=new EventEmitter();
  @Output() onDeletePlaylist:EventEmitter<number>=new EventEmitter();
  @Output() onChangePlaylist:EventEmitter<number>=new EventEmitter();
  @Output() onAdd:EventEmitter<videoElem>=new EventEmitter();
 
  isRemSong=false;

  sub;

  OnIndChanges(){
      //console.log(this.currentIndex);
      this.onIndexChange.emit(this.currentIndex);
  }

  addVideo(event){
    this.onAdd.emit(event);
  }

  hideSear(event){
    this.hideSearch=event;
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

  scrollPlacement(){
    this.divToScroll.nativeElement.scrollTop=(this.currentIndex-1)*60;
  }

  selectPL(index){
      console.log(index,"selected");
      this.onChangePlaylist.emit(index);
      this.isClosed=true;
  }

  addPL(){
    let names=[];
    this.playlists.forEach(element => {
      names.push(element.playlist);
    });
    const dialogRef = this.dialog.open(ModifyAddDialog, {
      width: '250px',
      data: {title:'',default:false,type:'Add',prevVals:names}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      if(result){
        this.onAddPlaylist.emit( {
          title:result.title,
          isDefault:result.default
        });
      }
    });
  }

  editPL(index){
    let names=[];
    this.playlists.forEach(element => {
      names.push(element.playlist);
    });
    const dialogRef = this.dialog.open(ModifyAddDialog, {
      width: '280px',
      data: {title:this.playlists[index].playlist,default:this.playlists[index].id==this.defaultPlaylist.id,type:'Modify',prevVals:names}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
     if(result){
      this.onModifyPlaylist.emit( {
        index:index,
        title:result.title,
        isDefault:result.default
      });
    } 
    this.isClosed=true;
    });
  }

  deletePL(index){
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {title: this.playlists[index].playlist, returnVal: false,type:'Playlists'}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      if(result && result.returnVal){
        this.onDeletePlaylist.emit(index);
      }
    });
    this.isClosed=true;
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

    this.isRemSong=true;

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {title: this.playerQueue[index].title, returnVal: false,type:'Queue'}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      if(result && result.returnVal){
        if(localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn')=='true'){
          let user=localStorage.getItem('username')?localStorage.getItem('username'):'Guest';
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
    setTimeout(()=>{
      if(this.isRemSong){
        this.isRemSong=false;
        return;
      }
      this.onDoubleClic.emit(index);
    })
          
  
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog implements OnInit {

  response:DialogData={
    title:'',
    returnVal:true,
    type:'Queue'
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

export interface PLInp{
  title:string,
  default:boolean,
  type:string,
  prevVals:Array<string>
}

@Component({
  selector: 'modify-add-playlist-dialog',
  templateUrl: 'modify-add-playlist-dialog.html',
})
export class ModifyAddDialog implements OnInit {

  validName=false;
  blankNm=true;
  origNm='';
  origBool=true;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PLInp) {}

    ngOnInit(){
      this.origNm=this.data.title;
      if(this.origNm.length>0){
        this.blankNm=false;
        this.validName=true;
      }
    }

    onNameChange(){
      if(this.data.title.length==0)
      {
        this.blankNm=true;
        return;
      }
      else{
        this.blankNm=false;
      }
      if(this.data.title!=this.origNm && this.data.prevVals.indexOf(this.data.title)>-1){
        this.validName=false;
        return;
      }
       this.validName=true;
    }

    onBoolChange(){
      this.origBool=!this.origBool;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
