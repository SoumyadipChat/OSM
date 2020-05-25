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
import { interval } from 'rxjs';
import { LoginDataFetcher } from '../services/loginDataFetche.service';

export interface videoElem{
  videoId:string,
  thumbnail:string,
  title:string,
  username?:string,
  id?:number,
  playlist?:string,
  lexoRank?:string
}

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
  providers:[musicStyleService,MusicDataFetcher,DataFetcher,PlaylistDataFetcher,LoginDataFetcher]
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

  noOfSongAdded=0;
  lexInterval;

  largePlayer=true;

  mobileDimset=false;

  loggedInUser:string;

  @ViewChild(PlayerComponent,{read: PlayerComponent,static:false}) playrComp:PlayerComponent;

  @ViewChild(MusicAddComponent,{read: MusicAddComponent,static:false}) addrComp:MusicAddComponent;

  @ViewChild(QueueComponent,{read: QueueComponent,static:false}) queueComp:QueueComponent;

  defplayerQueue=[
    {
      videoId:'P8PWN1OmZOA',
      thumbnail:"https://img.youtube.com/vi/P8PWN1OmZOA/hqdefault.jpg",
      title:'Tu Jaane Na'
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
  sub;


  constructor(private screenState:screenSizeState,private loginDtaFetcher:LoginDataFetcher,private styleSetter:musicStyleService,private musicDataFetcher:MusicDataFetcher,private playlistFetcher:PlaylistDataFetcher) { 

  }

  ngOnInit() {

    this.sub = interval(25*60*1000)
    .subscribe((val) => {
      this.loginDtaFetcher.getUser('Soumyadip').subscribe(name=>{
        console.log("Keep Server Alive");
      });
    });
    
  }

  ngAfterViewInit(){
    
    this.screenState.screenSize.subscribe(screen=>{
      if(!this.initCallDone){
        this.largePlayer=screen.isMobile;
        this.initCallDone=true;
      }
      this.onScreensizeChange(screen,(screen.isMobile&&this.expanded))
     })
     //this.onExpCollapse(true);
    if(localStorage.getItem('loggedIn')!==null){
      this.loggedInUser=(localStorage.getItem('loggedIn')=='true' && localStorage.getItem('username'))?localStorage.getItem('username'):'Guest';
      if(this.loggedInUser!='Guest'){
        this.usernm=this.loggedInUser.substring(1,this.loggedInUser.length-1);

        console.log("last index",localStorage.getItem('lastIndex')!='undefined',localStorage.getItem('lastIndex'));

        let lastPlaylist=(localStorage.getItem('playlist')!=null && localStorage.getItem('playlist')!='undefined')?JSON.parse(localStorage.getItem('playlist')):null;
        let lastIndexId=(localStorage.getItem('lastIndex')!=null && localStorage.getItem('lastIndex')!='undefined')?JSON.parse(localStorage.getItem('lastIndex')):null;


        this.playlistFetcher.getAllPlaylists(this.usernm).subscribe((playlsts:Array<any>)=>{
          this.playlists=this.playlists.concat(playlsts);
          this.addable=playlsts.length<4;
          let defVal='';
          let index=0;
          playlsts.forEach(plst=>{
            index++;
            if(lastPlaylist!=null && plst.id==lastPlaylist){
              defVal=plst.playlist;
              this.defaultPlaylist=plst;
              this.selectedPlaylist=index;
            }
            else if(lastPlaylist === null && plst.isDefault=='Y'){
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
            for(let song in this.playerQueue){
              if(lastIndexId != null && this.playerQueue[song].id==lastIndexId){
                this.currentIndex=+song;
                break;
              }
            }
            });
          });
            
            //this.playrComp.queueInitializer();
            
      }
      else{
        this.playerQueue=this.defplayerQueue;
      }
  }
  }

  onChangePlaylist(index){
    localStorage.setItem('playlist',JSON.stringify(this.playlists[index].id));
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

  onIndexChange(index){
    this.currentIndex=index;
    this.queueComp.scrollPlacement();
    localStorage.setItem('lastIndex',JSON.stringify(this.playerQueue[index].id))
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
    if((this.addrComp && this.addrComp.inputFocused==true) || (this.queueComp && this.queueComp.addrComp && this.queueComp.addrComp.inputFocused) ){
      return;
    }
    this.expanded=scrSz.isMobile;
    if(!expanded){
      this.largePlayer=false;
    }
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
      this.noOfSongAdded++;
      clearTimeout(this.lexInterval);
      this.lexInterval=setTimeout(()=>{
          if(this.noOfSongAdded==1){
            this.setLexoRankNew(video);
          }
          else{
            this.rebalance(video);
          }
          this.noOfSongAdded=0;
      },3000)
     this.playerQueue.push(video);
   }

   setLexoRankNew(video){
    if(localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn')=='true'){
      let user=localStorage.getItem('username')?localStorage.getItem('username'):'Guest';
      if(user!='Guest'){
        let index=this.playerQueue.length;
        let id=video.id;
        let prev=index==0?'first':this.playerQueue[index-1].lexoRank;
        let next='last';
        if(!prev){
          this.rebalance(video);
        }
        else{
          this.musicDataFetcher.setLexoRank(id,prev,next).subscribe((data:string)=>{
            if(data=='-1'){
              return;
            }
            else{
              let valArr=data.split('@');
              video.lexoRank=valArr[0];
              if(valArr.length>1 && valArr[1]=='rebalance'){
                this.rebalance(video);
              }
            }
          });
        }
        
      }
    }
   }

   rebalance(video){
     console.log("rebalancing");
    this.musicDataFetcher.rebalancePL(video.username,video.playlist).subscribe(data=>{
      console.log("Rebalanced");
    })
   }

   onEditTitle(item){
     console.log(item)
     let index=item.index;
     let title=item.title;
     
     this.musicDataFetcher.editTitle(this.playerQueue[index].id,title).subscribe(data=>{
        if(data!=-1){
          this.playerQueue[index].title=title;
        }
     });
   }

   playSong(index){
     this.playrComp.playIndexNumber(index);
   }

   onChangePos(index){
    if(localStorage.getItem('loggedIn') && localStorage.getItem('loggedIn')=='true'){
      let user=localStorage.getItem('username')?localStorage.getItem('username'):'Guest';
      if(user!='Guest'){
        let id=this.playerQueue[index].id;
        let prev=index==0?'first':this.playerQueue[index-1].lexoRank;
        let next=index==this.playerQueue.length-1?'last':this.playerQueue[index+1].lexoRank;
        this.musicDataFetcher.setLexoRank(id,prev,next).subscribe((data:string)=>{
          if(data=='-1'){
            return;
          }
          else{
            let valArr=data.split('@');
            this.playerQueue[index].lexoRank=valArr[0];
            if(valArr.length>1 && valArr[1]=='rebalance'){
              this.musicDataFetcher.rebalancePL(this.playerQueue[index].username,this.playerQueue[index].playlist).subscribe(data=>{
                console.log("Rebalanced");
              })
            }
          }
        });
      }
    }
   }

}
