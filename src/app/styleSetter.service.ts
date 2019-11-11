import { Injectable } from '@angular/core';
import { screenSize } from './services/screen-size.service';
import { Router } from '@angular/router';

@Injectable()
export class styleSetterService{

    constructor(private router:Router){

    }
    

    appStyleSetter(scrSz:screenSize){
        return {
            'width':  (scrSz.width-3)+'px',
            'height': (scrSz.height-3)+'px',
            'border':'1px solid white',
           }
    }

    routerOutletStyleSetter(scrSz:screenSize){
       return {
            'width':  (100)+'%',
            'height': (100)+'%',
          }
    }



    
   
}