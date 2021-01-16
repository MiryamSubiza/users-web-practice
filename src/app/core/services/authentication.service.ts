import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { IUser } from 'src/app/users/models/User';

let users: IUser[] = JSON.parse(localStorage.getItem('users')) || [];

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    private static LOCAL_STORAGE_TOKEN_KEY = 'token';
    private mode = 'VOLATILE';

    private tokenSource = new BehaviorSubject<string>(null);
    public token$ = this.tokenSource.asObservable();

    private errorMessageSource = new BehaviorSubject<string>(null);
    public errorMessage$ = this.errorMessageSource.asObservable();

    constructor(
        private http: HttpClient,
        private router: Router,
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

    public logIn(email: string, password: string): void {
        if (this.mode === 'VOLATILE') {
            const user = users.find((user) => user.email === email && user.password === password);
            if (user === undefined) {
                this.token = null;
                this.errorMessageSource.next('Correo electrónico o contraseña incorrectos.');
            } else {
                this.token = user.email;
                this.router.navigate(['/']);                
                this.errorMessageSource.next(null);
            }
        }
    }

    logOut() {
        this.token = null;
        this.router.navigate(['/login']);
    }

    signUp(user: IUser): void {
        if (this.mode === 'VOLATILE') {
            if (users.find((u) => u.email === user.email) !== undefined) {
                this.errorMessageSource.next('Ya existe un usuario con este correo electrónico.');
            } else {
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));
                this.errorMessageSource.next(null);
                this.logIn(user.email, user.password);
            }
        } else {
        }
    }
}