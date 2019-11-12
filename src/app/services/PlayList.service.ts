import { Injectable } from "@angular/core";
import { DataFetcher } from './DataFetcher.service';
import { Playlist } from './model';


@Injectable()
export class PlaylistDataFetcher{

    constructor(private dataFetcher:DataFetcher){
     }

    getAllPlaylists(user:string){
        let uri="playlist/getAll/"+user;
        return this.dataFetcher.get(uri);
    }

    addPlaylist(playlist:Playlist){
        let uri="playlist/saveItem";
        return this.dataFetcher.post(uri,playlist);
    }

    deletePlaylist(playlist:Playlist){
        let uri="playlist/deleteItem";
        return this.dataFetcher.post(uri,playlist);
    }

    editPlaylist(playlist:Playlist){
        let uri="playlist/editItem";
        return this.dataFetcher.post(uri,playlist);
    }

}