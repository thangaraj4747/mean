import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDetailService } from '../user-detail.service';
import { IRegisterDetails } from '../../model/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  regForm!: FormGroup;
  constructor(public fb: FormBuilder, public userSer: UserDetailService, public router: Router) {}
  ngOnInit() {
    this.regForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, this.passwordValidator]],
      phone: ['', [Validators.required, this.phoneValidator]]
    });
  }
  doReg() {
    if (this.regForm.valid) {
      this.userSer.doReg(this.regForm.value).subscribe({
        next: (data: IRegisterDetails) => {
          if (data) {
            this.router.navigateByUrl('/');
          }
        },
        error: (err) => console.log(err)
      });
    }
  }
  phoneValidator(control: FormControl) {
    const phoneNumber = control.value;
    const phoneRegex = /^(\+91|91)?(044)?[789]\d{9}$/;
    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      return {
        invalidPhoneNumber: true
      };
    }
    return null;
  }
  passwordValidator(control: FormControl) {
    const password = control.value;
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (password && !passwordRegex.test(password)) {
      return {
        invalidPassword: true
      };
    }
    return null;
  }
  getControls(controlName: string) {
    return this.regForm.controls[controlName];
  }
}
