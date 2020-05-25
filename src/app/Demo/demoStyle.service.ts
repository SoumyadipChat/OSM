import { Injectable } from '@angular/core';
import { screenSize } from '../services/screen-size.service';

@Injectable()
export class demoStyleService{

    constructor(){

    }

    loginStyleSetter(scrSz:screenSize){
        let boxSize=0.4*Math.min(scrSz.width,scrSz.height);
        return {
            'width':  boxSize*2+'px',
            'height': boxSize+'px',
            'position':'absolute',
            'top':(scrSz.height-boxSize)/1.9+'px',
            'left':(scrSz.width-boxSize*2)/2+'px',
             }
    }

    errorStyleSetter(scrSz:screenSize){
        let boxSize=0.1*Math.min(scrSz.width,scrSz.height);
        return {
            'width':  '100%',
            'height': boxSize+'px',
            'position':'absolute',
            'top':((scrSz.height-boxSize)/2+boxSize+50)+'px',
            'text-align':'center',
            'color':'white'
             }
    }

    loaderStyleSetter(scrSz:screenSize){
        let boxSize=0.4*Math.min(scrSz.width,scrSz.height);
        return {
            'width':  (boxSize*2-2)+'px',
            'height': boxSize-16+'px',
            'margin-left':'1px'
        }
    }
    
    picStyleSetter(scrSz:screenSize){
        return {
            'width': (scrSz.width-20)+'px',
            'height': (scrSz.height-100)+'px',
            'padding':'10px',
           }
    }

    bottomStyler(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        return {
            'width': scrSz.width+'px',
            'height': '80px',
            }
    }
    
    fullLogoStyler(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        return {
            'line-height':'1px',
            }
    }
}