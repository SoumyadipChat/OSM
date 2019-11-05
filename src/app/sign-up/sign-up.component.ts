import { Component, OnInit } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { signupStyleService } from './sign-up-style.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [signupStyleService]
})
export class SignUpComponent implements OnInit {

  loginStyle;
  tabTextStyle;
  inputTextStyle;
  tabTextAlignStyle;
  loginSelected:boolean=true;
  regSelected:boolean=false;
  otpSentOnce:boolean=false;


  invalidEmail:boolean=true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(private screenState:screenSizeState,private styleSetter:signupStyleService) { }

  ngOnInit() {
    this.screenState.screenSize.subscribe((scrSz)=>{
      this.onScreensizeChange(scrSz);
  })
  }

  onScreensizeChange(scrSz:screenSize){
    this.loginStyle=this.styleSetter.loginStyleSetter(scrSz);
    this.tabTextStyle=this.styleSetter.tabTextSizeSetter(scrSz);
    this.inputTextStyle=this.styleSetter.inputTextSizeSetter(scrSz);
    this.tabTextAlignStyle=this.styleSetter.tabTextAlignSizeSetter(scrSz);
  }

  loginClicked(){
    this.loginSelected=true;
    this.regSelected=false;
  }

  registerClicked(){
    this.loginSelected=false;
    this.regSelected=true;
  }

  sendOTP(){
    this.otpSentOnce=true;
  }

}
