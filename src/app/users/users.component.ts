import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AuthenticationService } from '../core/services/authentication.service';
import { IUser } from './models/User';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit, OnInit {

  @ViewChild(MatSort) sort: MatSort;
  
  public displayedColumns: string[] = ['name', 'age', 'email'];
  public filteredUsers = new MatTableDataSource([] as IUser[]);
  private users: IUser[];

  constructor(
    public authenticationService: AuthenticationService,
    public usersService: UsersService,
  ) {
    this.usersService.loadUsers();
  }

  ngOnInit(): void {
    this.usersService.users$
      .subscribe((users) => {
        this.users = users;
        this.filteredUsers = new MatTableDataSource(this.users);
      });
  }

  ngAfterViewInit() {
    this.filteredUsers.sort = this.sort;
  }

  filterUsers(value: string): void {
    if (value) {
      const val = value.trim().toLowerCase();
      this.filteredUsers = new MatTableDataSource(this.users
        .slice()
        .filter((user: IUser) => {
          let searchStr = '';
          this.displayedColumns.forEach((column) => {
            if (user[column]) {
              searchStr += (user[column]).toString().toLowerCase();
            }
          });
          return searchStr.indexOf(val) !== -1 || !val;
        }));
    }
  }
}
