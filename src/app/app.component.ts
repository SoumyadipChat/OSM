import { Component, HostListener, OnInit } from '@angular/core';
import { screenSizeState, screenSize } from './services/screen-size.service';
import { styleSetterService } from './styleSetter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[screenSizeState,styleSetterService]
})
export class AppComponent implements OnInit{
  title = 'OSM';
  appStyle;
  routerOutletStyle;

  constructor(private screenState:screenSizeState,private styleSetter:styleSetterService){

  }

  ngOnInit(){
      this.screenState.screenSize.subscribe((scrSz)=>{
          this.onScreensizeChange(scrSz);
      })
      this.screenState.updatedScreenSize(window.innerWidth,window.innerHeight,this.checkIfMobile(window.innerWidth,window.innerHeight));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
      this.screenState.updatedScreenSize(window.innerWidth,window.innerHeight,this.checkIfMobile(window.innerWidth,window.innerHeight));
  }

  checkIfMobile(wdt:number,hgt:number){
    return (wdt/hgt)<=1;
  }

  onScreensizeChange(scrSz:screenSize){
    console.log("screen size changed to",scrSz.width,"X",scrSz.height," and is Mobile :" ,scrSz.isMobile);
    this.appStyle = this.styleSetter.appStyleSetter(scrSz);
    this.routerOutletStyle=this.styleSetter.routerOutletStyleSetter(scrSz);
  }

  
}
