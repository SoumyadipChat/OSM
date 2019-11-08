import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { signupStyleService } from './sign-up-style.service';
import { FormControl, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDataFetcher } from '../services/loginDataFetche.service';
import { DataFetcher } from '../services/DataFetcher.service';
import { User } from '../services/model';
import { AutofillMonitor } from '@angular/cdk/text-field';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [signupStyleService,LoginDataFetcher,DataFetcher]
})
export class SignUpComponent implements OnInit,AfterViewInit {

  logoStyle;
  loginStyle;
  tabTextStyle;
  inputTextStyle;
  tabTextAlignStyle;
  abbrLogoStyle;
  fullLogoStyle;

  loginSelected:boolean=true;
  regSelected:boolean=false;
  otpSentOnce:boolean=false;
  hidePwd:boolean = true ;
  

  username:string='';
  eml:string='';
  public pwd:string='';
  otp:string='';
  otpVal:string='-1';

  errorEmailMsg='Invalid Email';
  errorUserMsg="Username can't be blank";


  invalidEmail:boolean=true;
  invalidPassword:boolean=true;
  invalidUsername:boolean=true;
  invalidOtp:boolean=true;

  allUsername;
  allEmail;

  loginError:boolean=false;
  loginErrorMsg='';

  

  constructor(private _autofill: AutofillMonitor,private dataFetcher:LoginDataFetcher,private router:Router,private screenState:screenSizeState,private styleSetter:signupStyleService) { 

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

  ngAfterViewInit(){
    
  }

  showLoginError(message){
      this.loginError=true;
      this.loginErrorMsg=message;
      setTimeout(() => {
        this.loginError=false;
        this.loginErrorMsg='';
      }, 5000);
  }

  resetModel(){
    this.username='';
    this.pwd='';
    this.eml='';
    this.otp='';
    this.hidePwd=true;
    this.otpSentOnce=false;
    this.errorEmailMsg='Invalid Email';
    this.errorUserMsg="Username can't be blank";
    this.invalidEmail=true;
    this.invalidPassword=true;
    this.invalidUsername=true;
    this.invalidOtp=true;
  }

  onScreensizeChange(scrSz:screenSize){
    this.loginStyle=this.styleSetter.loginStyleSetter(scrSz);
    this.logoStyle=this.styleSetter.logoStyleSetter(scrSz);
    this.abbrLogoStyle=this.styleSetter.abbrLogoStyler(scrSz);
    this.fullLogoStyle=this.styleSetter.fullLogoStyler(scrSz);
    this.tabTextStyle=this.styleSetter.tabTextSizeSetter(scrSz);
    this.inputTextStyle=this.styleSetter.inputTextSizeSetter(scrSz);
    this.tabTextAlignStyle=this.styleSetter.tabTextAlignSizeSetter(scrSz);
  }

  loginClicked(){
    this.resetModel();
    this.loginSelected=true;
    this.regSelected=false;
  }

  registerClicked(){
    this.resetModel();
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

  onLoginUsernameChange(username){
    if(username.length>0 && (this.allUsername.indexOf(username)!=-1 || this.allEmail.indexOf(username)!=-1)){
      this.invalidUsername=false;
    }
    else{
      this.invalidUsername=true;
      this.errorUserMsg=username.length>0?"Username not registered":"Username can't be blank";
    }
  }

  onLoginAutofilled(event){
    this.invalidUsername=false;
    this.invalidPassword=false;
  }

  onUsernameChange(username){
    if(username.length>0 && this.allUsername.indexOf(username)==-1){
      this.invalidUsername=false;
    }
    else{
      this.invalidUsername=true;
      this.errorUserMsg=username.length>0?"Username Already Taken":"Username can't be blank";
    }
  }

  checkPasswordLogin(){
    this.dataFetcher.checkPassword({username:this.username,password:this.pwd}).subscribe(data=>{
        if(data==1){
            sessionStorage.setItem('loggedIn','true');
            this.router.navigateByUrl("/music");
        }
        else if(data==0){
          this.showLoginError("Error validating Password")
        }
        else{
          this.showLoginError("Incorrect Password.Try Again")
        }
    });
  }


  onEmailChange(email){
    if(this.allEmail.indexOf(email)==-1 && new FormControl(email,[Validators.email]).valid){
      this.invalidEmail=false;
    }
    else{
      this.invalidEmail=true;
      this.errorEmailMsg=new FormControl(email,[Validators.email]).valid?"Email already in use":"Invalid Email";
    }
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
    if(this.otpVal!=this.otp){
        this.invalidOtp=true;
    }
    else{
        this.invalidOtp=false;
    }
  }

  registerUser(){
    let user:User={
      username:this.username,
      password:this.pwd,
      email:this.eml
    }
    this.dataFetcher.addUser(user).subscribe(data=>{
        alert("Registered");
        this.resetModel();
        this.regSelected=false;
        this.loginSelected=true;
    });
  }

}
