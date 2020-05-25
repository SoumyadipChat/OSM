import { Component, OnInit } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import {  demoStyleService } from './demoStyle.service';
import { Router } from '@angular/router';
import { LoginDataFetcher } from '../services/loginDataFetche.service';
import { DataFetcher } from '../services/DataFetcher.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  providers:[demoStyleService,LoginDataFetcher,DataFetcher]
})
export class DemoComponent implements OnInit {


  picStyle;
  bottomStyle;
  fullLogoStyle;
  loginStyle;
  loaderStyle;
  errorStyle;
  errorShow=false;
  errorShowConf=false;

  current=0;

  demoImages=[
    "demo.png",
    "demo1.jpg",
    "demo2.jpg",
    "demo5.jpg",
    "demo6.jpg",
    "demo3.jpg",
    "demo4.jpg"
  ]

  constructor(private screenState:screenSizeState,private styleSetter:demoStyleService,private router:Router,private loginDtaFetcher:LoginDataFetcher) { }

  ngOnInit() {
    
      this.screenState.screenSize.subscribe((scrSz)=>{
        this.onScreensizeChange(scrSz);
      }
    );
    
    //  this.router.navigateByUrl("/music"); 

  }
  

  onScreensizeChange(scrSz:screenSize){
    this.picStyle=this.styleSetter.picStyleSetter(scrSz);
    this.bottomStyle=this.styleSetter.bottomStyler(scrSz);
    this.fullLogoStyle=this.styleSetter.fullLogoStyler(scrSz);
    this.loginStyle=this.styleSetter.loginStyleSetter(scrSz);
    this.loaderStyle=this.styleSetter.loaderStyleSetter(scrSz);
    this.errorStyle=this.styleSetter.errorStyleSetter(scrSz);
  }

  goToMusic(){
    this.router.navigateByUrl("/music");
  }


  buttonClicked(){
    if(this.current == this.demoImages.length-1){
      this.goToMusic();
    }
    else{
      this.current++;
    }
  }
}
