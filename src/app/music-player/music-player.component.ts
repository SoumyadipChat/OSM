import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { musicStyleService } from './musicPlayerStyle.service';
import { MusicDataFetcher } from '../services/musicDataFetcher.service';
import { DataFetcher } from '../services/DataFetcher.service';
import { PlayerComponent } from '../player/player.component';
import { MusicAddComponent } from '../music-add/music-add.component';
import { PlaylistDataFetcher } from '../services/PlayList.service';
import { Playlist } from '../services/model';
import { QueueComponent } from '../queue/queue.component';

export interface videoElem{
  videoId:string,
  thumbnail:string,
  title:string,
  username?:string,
  id?:number,
  playlist?:string
}

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  providers:[musicStyleService,MusicDataFetcher,DataFetcher,PlaylistDataFetcher]
})
export class MusicPlayerComponent implements OnInit,AfterViewInit {

  headerBarStyle;
  musicPlayerStyle;
  leftStyle;
  rightStyle;
  playerStyle;
  adderStyle;
  largePlayerStyle;

  adderToggleShow;
  adderShow;
  expanded=true;
  lastScreenSz={
    height:0,
    width:0,
    isMobile:false
  };

  largePlayer=true;

  mobileDimset=false;

  loggedInUser:string;

  @ViewChild(PlayerComponent,{read: PlayerComponent,static:false}) playrComp:PlayerComponent;

  @ViewChild(MusicAddComponent,{read: MusicAddComponent,static:false}) addrComp:MusicAddComponent;

  @ViewChild(QueueComponent,{read: QueueComponent,static:false}) queueComp:QueueComponent;

  defplayerQueue=[
    {
      videoId:'YKcgwUg39yY',
      thumbnail:"https://img.youtube.com/vi/YKcgwUg39yY/hqdefault.jpg",
      title:'Dhadak(Title Track)'
    },
    {
      videoId:'DMRRC0rwO_I',
      thumbnail:"https://img.youtube.com/vi/DMRRC0rwO_I/hqdefault.jpg",
      title:'Khairiyat'
    },
    {
      videoId:'2kN3THdRih8',
      thumbnail:"https://img.youtube.com/vi/2kN3THdRih8/hqdefault.jpg",
      title:'Tum hi aana'
    }
  ];

  usernm;

  playlists=[
    {
      id:-1,
      playlist:'Default',
      isDefault:'Y',
      username:''
    }
  ];
  
  defaultPlaylist={
    id:-1,
    playlist:'Default',
    isDefault:'Y',
    username:''
  };
  selectedPlaylist=0;
  addable=false;

  playerQueue;
  initCallDone=false;

  currentIndex=-1;


  constructor(private screenState:screenSizeState,private styleSetter:musicStyleService,private musicDataFetcher:MusicDataFetcher,private playlistFetcher:PlaylistDataFetcher) { 

  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    
    this.screenState.screenSize.subscribe(screen=>{
      if(!this.initCallDone){
        this.largePlayer=screen.isMobile;
        this.initCallDone=true;
      }
      this.onScreensizeChange(screen,(screen.isMobile&&this.expanded))
     })
     this.onExpCollapse(true);
    if(localStorage.getItem('loggedIn')!==null){
      this.loggedInUser=(localStorage.getItem('loggedIn')=='true' && localStorage.getItem('username'))?localStorage.getItem('username'):'Guest';
      if(this.loggedInUser!='Guest'){
        this.usernm=this.loggedInUser.substring(1,this.loggedInUser.length-1);
        this.playlistFetcher.getAllPlaylists(this.usernm).subscribe((playlsts:Array<any>)=>{
          this.playlists=this.playlists.concat(playlsts);
          this.addable=playlsts.length<4;
          let defVal='';
          let index=0;
          playlsts.forEach(plst=>{
            index++;
            if(plst.isDefault=='Y'){
              defVal=plst.playlist;
              this.defaultPlaylist=plst;
              this.selectedPlaylist=index;
            }
          });
          this.musicDataFetcher.getAllSongs(this.usernm).subscribe((songList)=>{
            this.playerQueue=songList;
            if(defVal==''){
              this.playerQueue=this.playerQueue.filter(x=>x.playlist==null);
            }
            else{
              this.playerQueue=this.playerQueue.filter(x=>x.playlist==defVal);
            }
          
            this.playerQueue=this.playerQueue.filter(x=>x.videoId!=null);
            });
            this.playrComp.queueInitializer();
        })
      }
      else{
        this.playerQueue=this.defplayerQueue;
      }
  }
  }

  onChangePlaylist(index){
    this.selectedPlaylist=index;
    this.musicDataFetcher.getAllSongs(this.usernm).subscribe((songList)=>{
      this.playerQueue=songList;
        if(index==0){
          this.playerQueue=this.playerQueue.filter(x=>x.playlist==null);
        }
        else{
          this.playerQueue=this.playerQueue.filter(x=>x.playlist==this.playlists[index].playlist);
        }
        this.playerQueue=this.playerQueue.filter(x=>x.videoId!=null);
            });
            this.playrComp.player.stopVideo();
            this.currentIndex=-1;

  }

  onLargePlayerChange(isLarge){
      this.largePlayer=isLarge;
      this.queueComp.scrollPlacement();
       //this.expanded=false;
       //this.onExpCollapse(this.expanded);
      
  }

  onDeletePlaylist(index){
    if(this.playlists[index].id==this.defaultPlaylist.id){
      this.defaultPlaylist={
        id:-1,
        playlist:'Default',
        isDefault:'Y',
        username:''
      }
    }
    if(index==this.selectedPlaylist){
      this.onChangePlaylist(0);
    }
    this.playlistFetcher.deletePlaylist(this.playlists[index]).subscribe(data=>{
      this.playlists.splice(index,1);
      this.addable=true;
    })
  }

  onModifyPlaylist(input){
    if(this.playlists[input.index].id==this.defaultPlaylist.id && !input.isDefault){
      this.defaultPlaylist={
        id:-1,
        playlist:'Default',
        isDefault:'Y',
        username:''
      }
    }
    else if(this.playlists[input.index].id!=this.defaultPlaylist.id && input.isDefault){
        let prevDefault=this.defaultPlaylist;
        if(prevDefault.id!=-1){
          prevDefault.isDefault='N';
          this.playlistFetcher.editPlaylist(prevDefault).subscribe(data=>{
            console.log(data);
          });
        }
    }
    this.playlists[input.index].playlist=input.title;
    this.playlists[input.index].isDefault=input.isDefault?'Y':'N';
    this.playlistFetcher.editPlaylist(this.playlists[input.index]).subscribe(data=>{
      if(input.isDefault){
        this.defaultPlaylist=this.playlists[input.index];
      }
    })
  }

  onAddPlaylist(input){
    
    let newPl={
      id:-2,
      playlist:input.title,
      username:this.usernm,
      isDefault:input.isDefault?'Y':'N'
    }
    this.playlistFetcher.addPlaylist(newPl).subscribe((data:number)=>{
      newPl.id=data;
      this.playlists.push(newPl);
      if(this.playlists.length==5){
        this.addable=false;
      }
      if(input.isDefault){
         if(this.defaultPlaylist.id!=-1){
          this.defaultPlaylist.isDefault='N';
          this.playlistFetcher.editPlaylist(this.defaultPlaylist).subscribe(data=>{
              console.log(data);
          });
        }
        this.defaultPlaylist=newPl;
      }
    })

  }

  onExpCollapse(value){
      this.expanded=value;
      //this.leftStyle=this.styleSetter.leftStyleSetter(this.lastScreenSz,value);
      //this.rightStyle=this.styleSetter.rightStyleSetter(this.lastScreenSz,value);
      this.onScreensizeChange(this.lastScreenSz,value);
      
  }

  onScreensizeChange(scrSz:screenSize,expanded?:boolean){
    this.lastScreenSz=scrSz
    if(this.addrComp && this.addrComp.inputFocused==true){
      return;
    }
    this.expanded=scrSz.isMobile;
    console.log("Expanded",expanded,this.largePlayer);
     this.headerBarStyle=this.styleSetter.headerStyleSetter(scrSz);
      this.musicPlayerStyle=this.styleSetter.bodyStyleSetter(scrSz);
      this.leftStyle=expanded?this.styleSetter.leftStyleSetter(scrSz,true):this.styleSetter.leftStyleSetter(scrSz,scrSz.isMobile);
      this.rightStyle=expanded?this.styleSetter.rightStyleSetter(scrSz,true):this.styleSetter.rightStyleSetter(scrSz,scrSz.isMobile);
      this.playerStyle=expanded?this.styleSetter.playerStyleSetter(scrSz,true):this.styleSetter.playerStyleSetter(scrSz,scrSz.isMobile);
      this.largePlayerStyle=this.styleSetter.largePlayerStyleSetter(scrSz);
      this.adderStyle=this.styleSetter.adderStyleSetter(scrSz);
     
   }

   addVideo(video){
     this.playerQueue.push(video);
   }

   playSong(index){
     this.playrComp.playIndexNumber(index);
   }

}
