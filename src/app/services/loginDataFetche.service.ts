import { Injectable } from "@angular/core";
import { DataFetcher } from './DataFetcher.service';
import { User, Credentials } from './model';

@Injectable()
export class LoginDataFetcher{

    constructor(private dataFetcher:DataFetcher){
     }

    getAllUsers(){
        let uri="login/getAllUsername";
        return this.dataFetcher.get(uri);
    }

    getAllEmails(){
        let uri="login/getAllEmail";
        return this.dataFetcher.get(uri);
    }

    checkPassword(credential:Credentials){
        let uri="login/check/password";
        return this.dataFetcher.post(uri,credential);
    }

    addUser(user:User){
        let uri="login/saveUser";
        return this.dataFetcher.post(uri,user);
    }

    getUser(user:string){
        let uri="login/getUser/"+user;
        return this.dataFetcher.get(uri);
    }

    sendOTP(user:User){
        let uri="mail/sendMail";
        return this.dataFetcher.post(uri,user);
    }

    getOTP(){
        let uri="mail/getOTP";
        return this.dataFetcher.get(uri);
    }

}