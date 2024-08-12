import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { UserDetailService } from '../user-detail.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  userName: string = '';
  constructor(private userSer: UserDetailService) {}
  ngOnInit() {
    this.userSer.isLoggedIn.subscribe({
      next: (res: boolean) => {
        this.isLoggedIn = res;
        this.checkUsername();
      },
      error: (err) => console.log(err)
    });
    this.checkUsername();
  }
  checkUsername() {
    this.userName = this.getUsername();
    if (this.userName) {
      this.isLoggedIn = true;
    }
  }
  getUsername(): string {
    return localStorage.getItem('logged_user') || '';
  }
  doLogout() {
    this.userSer.doLogout().subscribe({
      next: (res) => {
        if (res) {
          localStorage.removeItem('logged_user');
          localStorage.removeItem('token');
          this.userSer.isLoggedIn.next(false);
        }
      },
      error: (err) => console.log(err)
    });
  }
}
