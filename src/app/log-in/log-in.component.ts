import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../core/services/authentication.service';

@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['../app.component.css', './log-in.component.css'],
})
export class LogInComponent implements OnInit {

    public logInForm: FormGroup;

    constructor(
        public authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private router: Router,
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
    }

    logIn(): void {
        if (this.logInForm.valid) {
            this.authenticationService.logIn(this.logInForm.value.email, this.logInForm.value.password);
        }
    }
}
