import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoginDetails, IRegisterDetails } from '../model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDetailService {
  constructor(public http: HttpClient) {}
  doReg(userDetails: IRegisterDetails): Observable<IRegisterDetails> {
    return this.http.post<IRegisterDetails>(
      'http://localhost:3000/profiles',
      userDetails
    );
  }
  doLogin(loginDetails: ILoginDetails): Observable<ILoginDetails> {
    return this.http.post<ILoginDetails>(
      'http://localhost:3000/profiles',
      loginDetails
    );
  }
  getUsers(): Observable<IRegisterDetails[]> {
    return this.http.get<IRegisterDetails[]>('http://localhost:3000/profiles');
  }
}
