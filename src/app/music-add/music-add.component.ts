import { Component, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { videoElem } from '../music-player/music-player.component';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { MusicDataFetcher } from '../services/musicDataFetcher.service';
import { DataFetcher } from '../services/DataFetcher.service';
import { YouTubeSearchService, Result } from '../services/youtube-search.service';
import { MatDialog } from '@angular/material';
import { ModalCompComponent } from '../modal-comp/modal-comp.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-music-add',
  templateUrl: './music-add.component.html',
  styleUrls: ['./music-add.component.scss'],
  providers:[MusicDataFetcher,DataFetcher,YouTubeSearchService],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: '80%',
        opacity: 1,
      })),
      state('closed', style({
        width:'5%',
        opacity: 0.9,
        })),
      transition('open => closed', [
        animate('0.3s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class MusicAddComponent implements OnInit{

  url:string;
  title:string='';
  searchInp:string='';
  invalidURL:boolean=true;
  invalidTitle:boolean=true;
  screenSt:screenSize;

  inputFocused=false;
  
  isOpen=false;
  hideSearch=true;

  @Input() playlists=[];
  @Input() selectedPlaylist=0;
  @Input() mode="mobile";
  
  @Output() onAdd:EventEmitter<videoElem>=new EventEmitter();
  @Output() onSearch:EventEmitter<boolean>=new EventEmitter();

  @ViewChild("input", {read: ElementRef,static:false}) input: ElementRef;
  @ViewChild("input1", {read: ElementRef,static:false}) input1: ElementRef;

  constructor(public dialog: MatDialog,private screenState:screenSizeState,private musicDataFetcher:MusicDataFetcher) { }
  
  ngOnInit() {
    this.screenState.screenSize.subscribe(scrSz=>{
        this.screenSt=scrSz;
    });
  }

  hideClick(){
    if(this.isOpen){
      this.isOpen=!this.isOpen;
      setTimeout(()=>{
        this.hideSearch=!this.hideSearch;
        this.onSearch.emit(this.hideSearch);
      },300)
    }
    else{
      
      this.hideSearch=!this.hideSearch;
      this.onSearch.emit(this.hideSearch);
      setTimeout(()=>{
        this.isOpen=!this.isOpen;
        this.input.nativeElement.focus();
      },100)
    }
  }
  

  openDialog(type){
    if(this.input){
      this.input.nativeElement.blur();
    }
    if(this.input1){
      this.input1.nativeElement.blur();
    }
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

    dialogRef.afterClosed().subscribe((results) => {
      //console.log('The dialog was closed');
      if(results && results.length>0){
        for(let result of results){
        this.addValue(result.id,result.title,result.thumbnailUrl);
        }
      }
    });
  }

  addValue(id,title,thumb){
    let videoElem:videoElem={
      videoId:id,
      title:title.split('|')[0].substring(0,30),
      thumbnail:thumb
    }
    if(localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn')=='true'){
      let user=localStorage.getItem('username')?localStorage.getItem('username'):'Guest';
      if(user!='Guest'){
        videoElem.username=user.substring(1,user.length-1)
        if(this.playlists[this.selectedPlaylist].id>=0){
          videoElem.playlist=this.playlists[this.selectedPlaylist].playlist;
        }
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

