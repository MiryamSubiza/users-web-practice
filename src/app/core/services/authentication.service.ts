import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Credentials } from 'src/app/log-in/models/credentials';
import { IUser } from 'src/app/users/models/User';
import { environment } from 'src/environments/environment';
import { logInUrl, signUpUrl } from '../routes';

let users: IUser[] = JSON.parse(localStorage.getItem('users')) || [];

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {

    private static LOCAL_STORAGE_TOKEN_KEY = 'token';

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

    public set errorMessage(errorMessage: string) {
        this.errorMessageSource.next(errorMessage);
    }

    public logIn(credentials: Credentials): void {
        if (environment.memory === 'persistent') {
            this.http.post<boolean>(logInUrl, credentials)
                .subscribe(() => {
                    this.token = credentials.email;
                    this.router.navigate(['/']);
                    this.errorMessage = null;
                }, (error) => {
                    switch (error && error instanceof HttpErrorResponse && error.status) {
                        case 401:
                            this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
                            break;
                        case 500:
                            this.errorMessage = 'Error iniciando sesión, inténtelo más tarde.';
                            break;
                        default:
                            break;
                    }
                    this.token = null;
                });
        } else if (environment.memory === 'volatile') {
            const user = users.find((user) => user.email === credentials.email && user.password === credentials.password);
            if (user === undefined) {
                this.token = null;
                this.errorMessage = 'Correo electrónico o contraseña incorrectos.';
            } else {
                this.token = user.email;
                this.router.navigate(['/']);
                this.errorMessage = null;
            }
        }
    }

    logOut() {
        this.token = null;
        this.router.navigate(['/login']);
        this.errorMessage = null;
    }

    signUp(user: IUser): void {
        if (user) {
            if (environment.memory === 'persistent') {
                this.http.post<IUser>(signUpUrl, user)
                    .subscribe((user) => {
                        if (user) {
                            this.errorMessage = null;
                            this.logIn({ email: user.email, password: user.password } as Credentials);
                        }
                    }, (error) => {
                        switch (error && error instanceof HttpErrorResponse && error.status) {
                            case 409:
                                this.errorMessage = 'Ya existe un usuario con este correo electrónico.';
                                break;
                            case 500:
                                this.errorMessage = 'Error registrando usuario, inténtelo más tarde.';
                                break;
                            default:
                                break;
                        }
                    });
            } else {
                if (users.find((u) => u.email === user.email) === undefined) {
                    users.push(user);
                    localStorage.setItem('users', JSON.stringify(users));
                    this.errorMessageSource = null;
                    this.logIn({ email: user.email, password: user.password } as Credentials);
                } else {
                    this.errorMessage = 'Ya existe un usuario con este correo electrónico.';
                }
            }
        }
    }
}