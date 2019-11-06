import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

@Injectable()
export class DataFetcher{

    baseUrl:string="https://osm-server.herokuapp.com/";

    httpOptions = {
        headers: new HttpHeaders({ 
          'Access-Control-Allow-Origin':'*',
          'Authorization':'authkey',
          'userid':'1'
        })
      };

    constructor(private http:HttpClient){

    }

    get(uri:string):Observable<Object>{
        let url=this.baseUrl.concat(uri);
        return this.http.get(url,this.httpOptions);
    }

    post(uri:string,request):Observable<Object>{
        let url=this.baseUrl.concat(uri);
        return this.http.post(url,request,this.httpOptions);
    }

}