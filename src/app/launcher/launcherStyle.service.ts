import { Injectable } from '@angular/core';
import { screenSize } from '../services/screen-size.service';

@Injectable()
export class launcherStyleService{

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
    
    logoStyleSetter(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        let wdt=scrSz.width/scrSz.height<0.75?boxSize*1.2:boxSize*0.8;
        return {
            'width': wdt+'px',
            'height': (scrSz.height-boxSize)+'px',
            'position':'absolute',
            'top':'50px',
            'padding-top':(scrSz.height-boxSize)/8+'px',
            'left':(scrSz.width-wdt)/2+'px',
            'font-size':(scrSz.height-boxSize)/(scrSz.isMobile?15:10)+'px'
           }
    }

    abbrLogoStyler(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        return {
            'line-height':((scrSz.height-boxSize)/3)+'px',
            }
    }
    
    fullLogoStyler(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        return {
            'line-height':'1px',
            }
    }
}