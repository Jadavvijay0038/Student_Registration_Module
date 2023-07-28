import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonApiService } from '../Services/common-api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  myForm: FormGroup;
  isSubmited: boolean = false;
  loginError: string | undefined;
  constructor(private fb: FormBuilder,
    private router: Router,
    private commonApi: CommonApiService
  ) {
    this.myForm = this.fb.group({
      emailOrMobile: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  get formControls() {
    return this.myForm.controls; // Corrected property name to 'myForm'
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.myForm.valid) {
      this.commonApi.login(this.myForm.value).subscribe(
        (loggedIn) => {
          this.commonApi.isloggin = loggedIn;
          if (loggedIn) {
            console.log('Login Successful');
            this.router.navigate(['/StudentList']);
          } else {
            this.loginError = 'Invalid credentials';
          }
        },
        (error) => {
          console.log('Error during login:', error);
          this.loginError = 'An error occurred during login. Please try again later.';
        }
      );
    }
  }
}

