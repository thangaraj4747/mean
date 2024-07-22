import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IRegisterDetails } from '../../model/user.model';
import { UserDetailService } from '../user-detail.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
  validUser: boolean = false;
  constructor(
    public fb: FormBuilder,
    public userSer: UserDetailService,
    public router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  doLogin() {
    this.userSer.getUsers().subscribe({
      next: (data: IRegisterDetails[]) => {
        if (data) {
          for (let user of data) {
            if (
              user.email === this.loginForm.value.email &&
              user.password === this.loginForm.value.password
            ) {
              this.validUser = true;
              localStorage.setItem('logged user', user.username);
              this.router.navigateByUrl('/dashboard');
              break;
            }
          }
          if (!this.validUser) {
            alert('Please check your username and password');
            localStorage.clear();
          }
        } else {
          console.log('something went wrong...');
        }
      },
      error: (err) => console.log(err),
    });
  }
}
