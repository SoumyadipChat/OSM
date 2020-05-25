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
            'background-color':'rgba(0,0,0,0.8)',
            'color':'white',
            'position':'absolute',
            'top':(scrSz.height-boxSize)/2+'px',
            'left':(scrSz.width-boxSize)/2+'px',
            'box-shadow': '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
           }
    }

    logoStyleSetter(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        let rat=2*boxSize/(scrSz.height-boxSize);
        if(rat<1.4){
            return {
                'width':  boxSize+'px',
                'height': (scrSz.height-boxSize)/2+'px',
                'position':'absolute',
                'top':'0px',
                'left':(scrSz.width-boxSize)/2+'px',
                'font-size':(scrSz.height-boxSize)/20+'px',
                'padding-top':(scrSz.height-boxSize)/12+'px',
               }
        }
        else{
            return {
                'width':  boxSize+'px',
                'height': (scrSz.height-boxSize)/2+'px',
                'position':'absolute',
                'top':'0px',
                'left':(scrSz.width-boxSize)/2+'px',
                'font-size':(scrSz.height-boxSize)/20+'px',
                'display':'flex',
                'justify-content':'center'
               }
        }
        
    }

    abbrLogoStyler(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        return {
            'line-height':((scrSz.height-boxSize)/5)+'px',
            }
    }

    imgLogoStyler(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        let rat=2*boxSize/(scrSz.height-boxSize);
        if(rat<1.6){
            return{
                'width':'100%'
            }
        }
        else{
            return{
                'height':'100%'
            }
        }
    }

    fullLogoStyler(scrSz:screenSize){
        let boxSize=0.6*Math.min(scrSz.width,scrSz.height);
        return {
            'line-height':'1px',
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