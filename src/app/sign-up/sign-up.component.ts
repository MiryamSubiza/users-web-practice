import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../app.component.css', './sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  public readonly MIN_AGE = 0;
  public readonly MAX_AGE = 100;

  public signUpForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    if (this.authenticationService.isAuthenticated) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(this.MIN_AGE), Validators.max(this.MAX_AGE)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      this.authenticationService.signUp(this.signUpForm.value);
    }
  }
}
