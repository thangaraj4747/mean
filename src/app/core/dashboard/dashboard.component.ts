import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserDetailService } from '../user-detail.service';
import { IRegisterDetails } from '../../model/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'password',
    'edit',
    'delete',
  ];
  dataSource!: MatTableDataSource<IRegisterDetails>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public userSer: UserDetailService) {}
  ngOnInit() {
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getUsers() {
    this.userSer.getUsers().subscribe({
      next: (data: IRegisterDetails[]) => {
        if (data) {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      error: (err) => console.log(err),
    });
  }
  doDelete(user: IRegisterDetails) {
    console.log('delete', user);
  }
  doEdit(user: IRegisterDetails) {
    console.log('edit', user);
  }
}
