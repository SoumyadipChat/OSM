import { HostListener, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface screenSize{
    width:number;
    height:number;
    isMobile:boolean;
}

@Injectable()
export class screenSizeState{

    private screenSizeSource = new BehaviorSubject<screenSize>({width:1280,height:720,isMobile:true});
  screenSize = this.screenSizeSource.asObservable();
  currentScreen:screenSize;

  constructor() { }

  updatedScreenSize(wdt:number,hgt:number,isMob:boolean){
      let newScreen:screenSize={
        width:wdt,
        height:hgt,
        isMobile:isMob
      }
      this.currentScreen=newScreen;
    this.screenSizeSource.next(newScreen);
  }

  getCurrentScreen():screenSize{
    return this.currentScreen;
  }

   
}

