import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './singup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupRequestPayload: SignupRequestPayload;
  signupForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private AuthService: AuthService,
    private router: Router,
    private toastr: ToastrService) {
    this.signupRequestPayload = {
      email: '',
      name: '',
      password: '',
      surname: ''
    };
  }

  ngOnInit(): void { }

  signup() {
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.name = this.signupForm.get('name')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;
    this.signupRequestPayload.surname = this.signupForm.get('surname')?.value;

    this.AuthService.signup(this.signupRequestPayload)
    .subscribe(data => {
      this.router.navigate(['/login'], { queryParams: { registered: 'true' } });
    }, () => {
      this.toastr.error('Registration Failed! Please try again!');
    });
  }
}
