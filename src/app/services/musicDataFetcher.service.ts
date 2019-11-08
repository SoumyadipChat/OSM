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

    saveSong(item:videoElem){
        let uri="music/saveItem";
        return this.dataFetcher.post(uri,item);
    }

    deleteSong(item:videoElem){
        let uri="music/deleteItem";
        return this.dataFetcher.post(uri,item);
    }

}
