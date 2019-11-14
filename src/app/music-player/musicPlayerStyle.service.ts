import { Injectable } from '@angular/core';
import { screenSize } from '../services/screen-size.service';


@Injectable()
export class musicStyleService{

    constructor(){

    }
    
    headerStyleSetter(scrSz:screenSize){
        if(scrSz.isMobile){
            return {
                'width':  (scrSz.width-3)+'px',
                'height': 0.03*(scrSz.height-3)+'px',
                'background-color':'white',
                }
        }
        else{
            return {
                'width':  (scrSz.width-3)+'px',
                'height': 0.05*(scrSz.height-3)+'px',
                'background-color':'white',
                }
        }
    }

    bodyStyleSetter(scrSz:screenSize){
        if(scrSz.isMobile){
            return {
                'width':  (scrSz.width-3)+'px',
                'height': 0.97*(scrSz.height-3)+'px',
                }
        }
        else{
            return {
                'width':  (scrSz.width-3)+'px',
                'height': 0.95*(scrSz.height-3)+'px',
                'display':'flex',
                'justify-content': 'flex-start'
                }
        }
    }

    leftStyleSetter(scrSz:screenSize,expanded?:boolean){
        if(expanded){
            return {
                'width':  (scrSz.width-3)+'px',
                'height': 6*(scrSz.width-3)/16+'px',
                'background-color':'rgba(0,0,0,0.0)',
                }
        }
        if(scrSz.isMobile){
            return {
                'width':  (scrSz.width-3)+'px',
                'height': ((9*(scrSz.width-3)/16)+(0.2*((0.97*(scrSz.height-3)-(9*(scrSz.width-3)/16)))))+'px',
                'background-color':'rgba(0,0,0,0.0)',
                }
        }
        else{
            return {
                'width':  0.7*(scrSz.width-3)+'px',
                'height': 0.95*(scrSz.height-3)+'px',
                'background-color':'rgba(0,0,0,0.0)',
                }
        }
    }

    rightStyleSetter(scrSz:screenSize,expanded?:boolean){
        if(expanded){
            return {
                'width':  (scrSz.width-3)+'px',
                'height': 0.97*(scrSz.height-3)-5*(scrSz.width-3)/16+'px',
                'background-color':'rgba(0,0,0,0.0)',
                }
        }
        if(scrSz.isMobile){
            return {
                'width':  (scrSz.width-3)+'px',
                'height': 0.8*((0.97*(scrSz.height-3)-(9*(scrSz.width-3)/16)))+'px',
                'background-color':'rgba(0,0,0,0.0)',
                }
        }
        else{
            return {
                'width':  0.3*(scrSz.width-3)+'px',
                'height': 0.95*(scrSz.height-3)+'px',
                'background-color':'rgba(0,0,0,0.0)',
                }
        }
    }

    playerStyleSetter(scrSz:screenSize,expanded?:boolean){
        if(expanded){
            return {
                'width':  (scrSz.width-3)+'px',
                'height': 6*(scrSz.width-3)/16+'px',
                'background-color':'rgba(0,0,0,0)',
                }
        }
        if(scrSz.isMobile){
            return {
                'width':  (scrSz.width-3)+'px',
                'height': 9*(scrSz.width-3)/16+'px',
                'background-color':'rgba(0,0,0,0)',
                }
        }
        else{
            return {
                'width':  0.7*(scrSz.width-3)+'px',
                'height': 0.7*0.95*(scrSz.height-3)+'px',
                'background-color':'rgba(0,0,0,0)',
                }
        }
    }

    largePlayerStyleSetter(scrSz:screenSize,expanded?:boolean){
        return {
                'width':  (scrSz.width-3)+'px',
                'height': (0.97*scrSz.height-3)+'px',
                'background-color':'rgba(0,0,0,0)',
                }
        
    }

    adderStyleSetter(scrSz:screenSize){
        if(scrSz.isMobile){
            return {
                'width':  (scrSz.width-3)+'px',
                'height': 0.2*((0.97*(scrSz.height-3)-(9*(scrSz.width-3)/16)))+'px',
                'background-color':'rgba(0,0,0,0)',
                'z-index':'999'
                }
        }
        else{
            return {
                'width':  0.7*(scrSz.width-3)+'px',
                'height': 0.3*0.95*(scrSz.height-3)+'px',
                'background-color':'rgba(0,0,0,0)',
                }
        }
    }

}