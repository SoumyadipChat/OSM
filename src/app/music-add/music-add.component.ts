import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { videoElem } from '../music-player/music-player.component';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { MusicDataFetcher } from '../services/musicDataFetcher.service';
import { DataFetcher } from '../services/DataFetcher.service';
import { YouTubeSearchService, Result } from '../services/youtube-search.service';
import { MatDialog } from '@angular/material';
import { ModalCompComponent } from '../modal-comp/modal-comp.component';

@Component({
  selector: 'app-music-add',
  templateUrl: './music-add.component.html',
  styleUrls: ['./music-add.component.scss'],
  providers:[MusicDataFetcher,DataFetcher,YouTubeSearchService]
})
export class MusicAddComponent implements OnInit{

  url:string;
  title:string='';
  searchInp:string='';
  invalidURL:boolean=true;
  invalidTitle:boolean=true;
  screenSt:screenSize;
  
  @Output() onAdd:EventEmitter<videoElem>=new EventEmitter();

  constructor(public dialog: MatDialog,private screenState:screenSizeState,private musicDataFetcher:MusicDataFetcher) { }
  
  ngOnInit() {
    this.screenState.screenSize.subscribe(scrSz=>{
        this.screenSt=scrSz;
    });
  }

  openDialog(type){
    if(this.searchInp.length==0){
      return;
    }
    const dialogRef = this.dialog.open(ModalCompComponent, {
      width: '500px',
      data: { id:'',
        title:'',
        search:this.searchInp,
        type:type
      }
    });

    dialogRef.afterClosed().subscribe((result:Result) => {
      //console.log('The dialog was closed');
      if(result){
        this.addValue(result.id,result.title,result.thumbnailUrl);
      }
    });
  }

  addValue(id,title,thumb){
    let videoElem:videoElem={
      videoId:id,
      title:title.split('|')[0].substring(0,20),
      thumbnail:thumb
    }
    if(sessionStorage.getItem('loggedIn') && sessionStorage.getItem('loggedIn')=='true'){
      let user=sessionStorage.getItem('username')?sessionStorage.getItem('username'):'Guest';
      if(user!='Guest'){
        videoElem.username=user.substring(1,user.length-1)
        this.musicDataFetcher.saveSong(videoElem).subscribe(data=>{
          console.log(data);
        });
      }
    }
    this.onAdd.emit(videoElem);
  }

  onURLChange(){
    this.invalidURL=false;
  }

  onTitleChange(){
   this.invalidTitle=this.title.length==0;
  }

  getPhotoUrl(id){
    return "http://img.youtube.com/vi/"+id+"/hqdefault.jpg"
  }

  getIdFromUrl(url){
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return '-1';
    }
  }
  
}

