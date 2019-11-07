import { Component, OnInit } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { signupStyleService } from './sign-up-style.service';
import { FormControl, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDataFetcher } from '../services/loginDataFetche.service';
import { DataFetcher } from '../services/DataFetcher.service';
import { User } from '../services/model';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [signupStyleService,LoginDataFetcher,DataFetcher]
})
export class SignUpComponent implements OnInit {

  loginStyle;
  tabTextStyle;
  inputTextStyle;
  tabTextAlignStyle;
  loginSelected:boolean=false;
  regSelected:boolean=true;
  otpSentOnce:boolean=false;

  username:string='';
  eml:string='';
  public pwd:string='';
  otp:string='';
  otpVal:string='-1';


  invalidEmail:boolean=true;
  invalidPassword:boolean=true;
  invalidUsername:boolean=true;

  allUsername;
  allEmail;

   

  constructor(private dataFetcher:LoginDataFetcher,private router:Router,private screenState:screenSizeState,private styleSetter:signupStyleService) { 

  }

  ngOnInit() {
    this.screenState.screenSize.subscribe((scrSz)=>{
      this.onScreensizeChange(scrSz);
  })
    this.dataFetcher.getAllUsers().subscribe(data=>{
      this.allUsername=data;
    });
    this.dataFetcher.getAllEmails().subscribe(data=>{
      this.allEmail=data;
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
    let user:User={
      username:this.username,
      password:this.pwd,
      email:this.eml
    }
    this.dataFetcher.sendOTP(user).subscribe(data=>{
        if(data==-1){
          alert("OTP send not successful");
          this.otpVal='-1';
        }
        else{
          this.dataFetcher.getOTP().subscribe(data=>{
              let decrOTP=this.otpDecryptor(JSON.stringify(data));
              if(decrOTP=='-1'){
                alert("error fetching OTP");
                this.otpVal='-1';
              }
              else{
                this.otpVal=''+decrOTP;
              }
          })
        }
    });
  }

  otpDecryptor(value:string){
    let otpParts=value.split('.');
    if(otpParts.length<2){
      return "-1";
    }
    return (+otpParts[0]-(+otpParts[1]))/+otpParts[1];
  }

  openMusicGuest(){
    this.router.navigateByUrl("/music");
  }

  onUsernameChange(username){
    if(this.allUsername.indexOf(username)==-1){
      this.invalidUsername=false;
    }
    else{
      this.invalidUsername=true;
    }
    console.log(this.invalidUsername);
  }


  onEmailChange(email){
    if(this.allEmail.indexOf(email)==-1 && new FormControl(email,[Validators.email]).valid){
      this.invalidEmail=false;
    }
    else{
      this.invalidEmail=true;
    }
    console.log(this.invalidEmail);
  }

  
  onPwdChange(passwd){
    if(passwd.length<6 || passwd.length>20){
      this.invalidPassword=true;
    }
    else{
      this.invalidPassword=false;
    }
  }

  
  onOTPChange(otp){
    console.log(otp);
  }

  registerUser(){
    let user:User={
      username:this.username,
      password:this.pwd,
      email:this.eml
    }
    this.dataFetcher.addUser(user).subscribe(data=>{
        alert("Registered");
        console.log(data);
    });
  }

}
