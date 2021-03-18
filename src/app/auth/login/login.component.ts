import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayload } from './login-request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string = 'some message';
  isError: boolean = false;
    
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute,
    private router: Router, private toastr: ToastrService) {

    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    this.loginRequestPayload = {
      email: '',
      password: ''
    };
   }

  ngOnInit(): void {
    this.activatedRoute.queryParams
    .subscribe(params => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage = 'Please Check your inbox for activation email!';
      } else {
        this.registerSuccessMessage = 'damn';
      }
    });
  }

  login() {
    this.loginRequestPayload.email = this.loginForm.get('email')?.value;
    this.loginRequestPayload.password = this.loginForm.get('password')?.value;
  
    this.authService.login(this.loginRequestPayload).subscribe(data => {
      if (data) {
        this.isError = false;
        this.router.navigateByUrl('/');
        this.toastr.success('Login Successful');
      } else {
        this.isError = true;
      }
    });
  }

}
