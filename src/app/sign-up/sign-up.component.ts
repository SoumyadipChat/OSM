import { Component, OnInit } from '@angular/core';
import { screenSizeState, screenSize } from '../services/screen-size.service';
import { signupStyleService } from './sign-up-style.service';
import { FormControl, Validators, ValidationErrors, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDataFetcher } from '../services/loginDataFetche.service';
import { DataFetcher } from '../services/DataFetcher.service';
import { User } from '../services/model';

export function passwdValidator(pass:string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && control.value != pass) {
          return { 'notMatching': true };
      }
      return null;
  };
}

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
  loginSelected:boolean=true;
  regSelected:boolean=false;
  otpSentOnce:boolean=false;

  username:string='';
  eml:string='';
  public pwd:string='';
  otp:string='';


  invalidEmail:boolean=true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password= new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(24)])
  passwordConfirm=new FormControl(null,[Validators.required],this.passwdValidator.bind(this));

  passwdValidator(c:FormControl){
    return c.value!=this.pwd?{ 'notMatching': true }:null;
    
  }
  

  constructor(private dataFetcher:LoginDataFetcher,private router:Router,private screenState:screenSizeState,private styleSetter:signupStyleService) { 

  }

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

  openMusicGuest(){
    this.router.navigateByUrl("/music");
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
