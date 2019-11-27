import { DataFetcher } from './DataFetcher.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { videoElem } from '../music-player/music-player.component';

@Injectable()
export class MusicDataFetcher{

    constructor(private dataFetcher:DataFetcher){
     }

    getAllSongs(user:string){
        let uri="music/getAll/"+user;
        return this.dataFetcher.get(uri);
    }

    editTitle(id:number,title:string){
        let uri="music/update/"+id+"/"+title;
        return this.dataFetcher.get(uri);
    }

    saveSong(item:videoElem){
        let uri="music/saveItem";
        return this.dataFetcher.post(uri,item);
    }

    deleteSong(item:videoElem){
        let uri="music/deleteItem";
        return this.dataFetcher.post(uri,item);
    }

    setLexoRank(id:number,prev:string,next:string){
        let uri="lexo/setLexorank"
        return this.dataFetcher.post(uri,{id:id,prev:prev,next:next});
    }

    rebalancePL(usernm:string,playlist:string){
        let uri="lexo/rebalance/"+usernm+"/"+playlist;
        return this.dataFetcher.get(uri);
    }
    

}
