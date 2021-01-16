import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../core/services/authentication.service';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

    public logInForm: FormGroup;
    public apiError: boolean;
    public authError: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
    ) {
        if (this.authenticationService.isAuthenticated) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.logInForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        this.logInForm.valueChanges
            .subscribe(() => {
                this.apiError = false;
                this.authError = false;
            });
    }

    signIn(): void {
        this.authError = false;
        this.apiError = false;

        if (this.logInForm.valid) {
            this.authenticationService.logIn(this.logInForm.value.email, this.logInForm.value.password)
                .then((token) => {
                    if (token) {
                        this.router.navigate(['/']);
                    }
                })
                .catch((error) => {
                    if (!error || (error && error.status === 401)) {
                        this.authError = true;
                    } else {
                        this.apiError = true;
                    }
                });
        }
    }
}
