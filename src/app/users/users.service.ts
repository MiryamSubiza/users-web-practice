import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { IUser } from './models/User';

@Injectable()
export class UsersService {

  private readonly usersUrl = 'http://localhost:8080/users/fromdb';

  private usersSource = new BehaviorSubject<IUser[]>(null);
  public users$ = this.usersSource.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  set users(users: IUser[]) {
    this.usersSource.next(users);
  }

  get users(): IUser[] {
    return this.usersSource.getValue();
  }

  public loadUsers(): void {
    this.users = JSON.parse(localStorage.getItem('users'));

    /*this.http.get<IUser[]>(this.usersUrl)
      .subscribe((users) => {
        console.log('users', users)
        this.users = users || [];
      }, () => {
        this.users = undefined;
      });*/
  }
}