import { Injectable } from '@angular/core';
import { screenSize } from '../services/screen-size.service';
import { Minimatch } from 'minimatch';

@Injectable()
export class signupStyleService{

    constructor(){

    }
    
    loginStyleSetter(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        return {
            'width':  boxSize+'px',
            'height': boxSize+'px',
            'background-color':'white',
            'position':'absolute',
            'top':(scrSz.height-boxSize)/2+'px',
            'left':(scrSz.width-boxSize)/2+'px',
           }
    }

    tabTextSizeSetter(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        let tabSize=0.15*boxSize;
        return {
            'font-size':(0.4*tabSize)+'px',
        }
    }

    inputTextSizeSetter(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        let tabSize=0.15*boxSize;
        return {
            'font-size':(0.3*tabSize)+'px',
        }
    }

    tabTextAlignSizeSetter(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        let tabSize=0.15*boxSize;
        return {
            'height':(tabSize)+'px',
            'line-height':(tabSize)+'px',
        }
    }

       
   
}