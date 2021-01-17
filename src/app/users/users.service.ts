import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { IUser } from './models/User';
import { environment } from 'src/environments/environment';
import { usersUrl } from '../core/routes';

@Injectable()
export class UsersService {

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
    if (environment.memory === 'persistent') {
      this.http.get<IUser[]>(usersUrl)
        .subscribe((users) => {
          this.users = users || [];
        }, () => {
          this.users = undefined;
        });
    } else if (environment.memory === 'volatile') {
      this.users = JSON.parse(localStorage.getItem('users'));
    }

  }
}