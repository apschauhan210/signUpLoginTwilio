import { User } from './user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public setOTP(otp: string){
    sessionStorage.setItem('otp', otp);
  }

  public getOTP(){
    return sessionStorage.getItem('otp');
  }

  public deleteOTP(){
    sessionStorage.removeItem('otp');
  }

  public setLoggedUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getLoggedUser(){
    const user = localStorage.getItem('user');
    if(user != null)
      return JSON.parse(user);
  }

  public deleteLoggedUser(){
    localStorage.removeItem('user');
  }

  public setTempUser(user: User){
    sessionStorage.setItem('tempUser', JSON.stringify(user));
  }

  public getTempUser(){
    const user = sessionStorage.getItem('tempUser');
    if(user != null){
      return JSON.parse(user);
    }
  }

  public deleteTempUser(){
    sessionStorage.removeItem('tempUser');
  }
}
