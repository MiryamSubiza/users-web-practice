import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Credentials } from 'src/app/log-in/models/credentials';
import { User } from 'src/app/users/models/User';

let users: User[] = JSON.parse(localStorage.getItem('users')) || [];

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    private static LOCAL_STORAGE_TOKEN_KEY = 'token';
    private mode = 'VOLATILE';

    private tokenSource = new BehaviorSubject<string>(null);
    public token$ = this.tokenSource.asObservable();

    constructor(
        private http: HttpClient,
    ) {
        if (!this.hasToken && this.hasLocalStorageToken) {
            this.token = this.localStorageToken;
        }

        this.token$.subscribe((newToken) => {
            this.localStorageToken = newToken;
        });
    }

    set token(newToken: string) {
        this.tokenSource.next(newToken);
    }

    get token(): string {
        return this.tokenSource.getValue();
    }

    set localStorageToken(newToken: string) {
        if (newToken) {
            localStorage.setItem(AuthenticationService.LOCAL_STORAGE_TOKEN_KEY, newToken);
        } else {
            localStorage.removeItem(AuthenticationService.LOCAL_STORAGE_TOKEN_KEY);
        }
    }

    get localStorageToken(): string {
        return localStorage.getItem(AuthenticationService.LOCAL_STORAGE_TOKEN_KEY);
    }

    get isAuthenticated(): boolean {
        return this.hasToken;
    }

    get hasToken(): boolean {
        return !!this.token;
    }

    get hasLocalStorageToken(): boolean {
        return !!this.localStorageToken;
    }

    public logIn(email: string, password: string): Promise<string | Error> {
        return new Promise((resolve, reject) => {
            if (this.mode === 'VOLATILE') {
                const user = users.find((user) => user.email === email && user.password === password);
                if (user === undefined) {
                    this.token = null;
                    reject();
                } else {
                    this.token = user.email;
                    resolve(this.token);
                }
            } else {
                const credentials = new Credentials(email, password);
                this.http.post<Credentials>('/users/login', credentials)
                    .subscribe((user: User) => {
                        this.token = user.email;
                        resolve(this.token);
                    }, (error) => {
                        this.token = null;
                        reject(error);
                    });
            }
        });
    }

    /* logOut() {
        this.token = null;
        this.router.navigate(['/login']);
    } */
}