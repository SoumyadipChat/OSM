import { Component, OnInit } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { launcherStyleService } from './launcherStyle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-launcher',
  templateUrl: './launcher.component.html',
  styleUrls: ['./launcher.component.scss'],
  providers:[launcherStyleService]
})
export class LauncherComponent implements OnInit {


  logoStyle;
  abbrLogoStyle;
  fullLogoStyle;
  loginStyle;
  loaderStyle;

  constructor(private screenState:screenSizeState,private styleSetter:launcherStyleService,private router:Router) { }

  ngOnInit() {
    
      this.screenState.screenSize.subscribe((scrSz)=>{
        this.onScreensizeChange(scrSz);
      }
    );
    setTimeout(()=>{
      (sessionStorage.getItem('loggedIn') && sessionStorage.getItem('loggedIn')=='true')?
    this.router.navigateByUrl("/music"):
    this.router.navigateByUrl("/login");
    },5000);  
    

  }
  

  onScreensizeChange(scrSz:screenSize){
    this.logoStyle=this.styleSetter.logoStyleSetter(scrSz);
    this.abbrLogoStyle=this.styleSetter.abbrLogoStyler(scrSz);
    this.fullLogoStyle=this.styleSetter.fullLogoStyler(scrSz);
    this.loginStyle=this.styleSetter.loginStyleSetter(scrSz);
    this.loaderStyle=this.styleSetter.loaderStyleSetter(scrSz);
  }

}
