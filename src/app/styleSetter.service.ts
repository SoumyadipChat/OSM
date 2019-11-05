import { Injectable } from '@angular/core';
import { screenSize } from './services/screen-size.service';
import { Router } from '@angular/router';

@Injectable()
export class styleSetterService{

    constructor(private router:Router){

    }
    

    appStyleSetter(scrSz:screenSize){
        return {
            'width':  (scrSz.width-8)+'px',
            'height': (scrSz.height-8)+'px',
           }
    }

    headerStyleSetter(scrSz:screenSize){
        let isLoginScreen=this.router.url==("/login") || this.router.url==("/");
        console.log(isLoginScreen,this.router.url);
        return {
            'width':  (100)+'%',
            'height': (isLoginScreen?0:8)+'%',
            'display':isLoginScreen?'none':'block',
          }
    }

    routerOutletStyleSetter(scrSz:screenSize){
        let isLoginScreen=this.router.url==("/login") || this.router.url==("/");
        return {
            'width':  (100)+'%',
            'height': (isLoginScreen?100:92)+'%',
          }
    }



    
   
}