import { Component, OnInit } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { launcherStyleService } from './launcherStyle.service';
import { Router } from '@angular/router';
import { LoginDataFetcher } from '../services/loginDataFetche.service';
import { DataFetcher } from '../services/DataFetcher.service';

@Component({
  selector: 'app-launcher',
  templateUrl: './launcher.component.html',
  styleUrls: ['./launcher.component.scss'],
  providers:[launcherStyleService,LoginDataFetcher,DataFetcher]
})
export class LauncherComponent implements OnInit {


  logoStyle;
  abbrLogoStyle;
  fullLogoStyle;
  loginStyle;
  loaderStyle;

  constructor(private screenState:screenSizeState,private styleSetter:launcherStyleService,private router:Router,private loginDtaFetcher:LoginDataFetcher) { }

  ngOnInit() {
    
      this.screenState.screenSize.subscribe((scrSz)=>{
        this.onScreensizeChange(scrSz);
      }
    );
    this.loginDtaFetcher.getUser('Soumyadip').subscribe(name=>{
      console.log(name=="Soumyadip");
      setTimeout(()=>{
      (sessionStorage.getItem('loggedIn') && sessionStorage.getItem('loggedIn')=='true')?
      this.router.navigateByUrl("/music"):
      this.router.navigateByUrl("/login");
      },5000); 
    }) 
    

  }
  

  onScreensizeChange(scrSz:screenSize){
    this.logoStyle=this.styleSetter.logoStyleSetter(scrSz);
    this.abbrLogoStyle=this.styleSetter.abbrLogoStyler(scrSz);
    this.fullLogoStyle=this.styleSetter.fullLogoStyler(scrSz);
    this.loginStyle=this.styleSetter.loginStyleSetter(scrSz);
    this.loaderStyle=this.styleSetter.loaderStyleSetter(scrSz);
  }

}
