import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserDetailService } from '../user-detail.service';
import { IRegisterDetails } from '../../model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  regForm!: FormGroup;
  constructor(
    public fb: FormBuilder,
    public userSer: UserDetailService,
    public router: Router
  ) {}
  ngOnInit() {
    this.regForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  doReg() {
    this.userSer.doReg(this.regForm.value).subscribe({
      next: (data: IRegisterDetails) => {
        if (data) {
          this.router.navigateByUrl('/');
        }
      },
      error: (err) => console.log(err),
    });
  }
}
