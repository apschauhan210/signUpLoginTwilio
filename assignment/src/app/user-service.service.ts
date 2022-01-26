import { environment } from './../environments/environment.prod';
import { User } from './user';
// import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUserByPhone(phone: String): Observable<User>{
    return this.http.get<User>(`${this.apiServerUrl}/assignment/user?phone=${phone}`);
  }

  public requestOTP(user: User): Observable<string>{
    return this.http.post<string>(`${this.apiServerUrl}/assignment/requestotp/`, user);
  } 

  public registerUser(user: User): Observable<User>{
    return this.http.post<User>(`${this.apiServerUrl}/assignment/register`, user);
  }

  public validateUser(user: User): Observable<boolean>{
    return this.http.post<boolean>(`${this.apiServerUrl}/assignment/login`, user);
  }

  public deleteUser(phone: string): Observable<User>{
    return this.http.delete<User>(`${this.apiServerUrl}/assignment/delete?phone=${phone}`);
  }
}
