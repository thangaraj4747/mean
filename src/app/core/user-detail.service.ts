import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginDetails, IRegisterDetails } from '../model/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {
  isLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(public http: HttpClient) {}
  doReg(userDetails: IRegisterDetails): Observable<IRegisterDetails> {
    return this.http.post<IRegisterDetails>('http://localhost:9090/users/register', userDetails);
  }
  doLogin(loginDetails: ILoginDetails): Observable<ILoginDetails> {
    return this.http.post<ILoginDetails>('http://localhost:9090/users/login', loginDetails);
  }
  getUsers(): Observable<IRegisterDetails[]> {
    return this.http.get<IRegisterDetails[]>('http://localhost:3000/profiles');
  }
  isLoggedUser(): boolean {
    return !!localStorage.getItem('logged_user');
  }
  doLogout() {
    let token = localStorage.getItem('token') || '';
    let headers = new HttpHeaders({
      Authorization: `Barear ${token}`
    });
    return this.http.post('http://localhost:9090/users/logout', {}, { headers });
  }
}
