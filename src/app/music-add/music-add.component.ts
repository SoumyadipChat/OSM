import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { videoElem } from '../music-player/music-player.component';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { MusicDataFetcher } from '../services/musicDataFetcher.service';
import { DataFetcher } from '../services/DataFetcher.service';

@Component({
  selector: 'app-music-add',
  templateUrl: './music-add.component.html',
  styleUrls: ['./music-add.component.scss'],
  providers:[MusicDataFetcher,DataFetcher]
})
export class MusicAddComponent implements OnInit{

  url:string;
  title:string='';
  invalidURL:boolean=true;
  invalidTitle:boolean=true;
  screenSt:screenSize;
  
  @Output() onAdd:EventEmitter<videoElem>=new EventEmitter();

  constructor(private screenState:screenSizeState,private musicDataFetcher:MusicDataFetcher) { }
  
  ngOnInit() {
    this.screenState.screenSize.subscribe(scrSz=>{
        this.screenSt=scrSz;
    });
  }

  addValue(){
    if(this.invalidTitle){
      return;
    }
    let id=this.getIdFromUrl(this.url);
    if(id=='-1'){
      this.invalidURL=true;
      return;
    }
    let videoElem:videoElem={
      videoId:id,
      title:this.title,
      thumbnail:this.getPhotoUrl(id)
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

