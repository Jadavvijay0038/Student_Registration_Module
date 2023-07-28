import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STATES, CITIES } from '../StaticData';
import { CommonApiService } from '../Services/common-api.service';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css']
})
export class StudentRegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  states = STATES;
  cities: { id: number; name: string; }[] = [];
  showSuccessMessage: boolean;
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  constructor(private formBuilder: FormBuilder,
    private commonApi: CommonApiService, private snackBar: MatSnackBar) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      profileImage: ['']
    }, {
      validator: this.passwordMatchValidator // Custom validator to check password and confirm password match
    });
  }

  ngOnInit() {
    this.registrationForm.get('state').valueChanges.subscribe((selectedStateId) => {
      if (selectedStateId) {
        this.cities = CITIES[selectedStateId];
        this.registrationForm.get('city').setValue('');
      } else {
        this.cities = [];
        this.registrationForm.get('city').setValue('');
      }
    });
    this.registrationForm.get('email').valueChanges.subscribe((emailValue) => {
      this.checkDuplicate('email', emailValue.toLowerCase());
    });

    this.registrationForm.get('phoneNumber').valueChanges.subscribe((phoneValue) => {
      this.checkDuplicate('phoneNumber', phoneValue);
    });
  }

  checkDuplicate(field: string, value: string) {
    this.commonApi.checkDuplicateEntry(field, value).subscribe(
      (response) => {
        if (response.duplicate) {
          const control = this.registrationForm.get(field);
          control.setErrors({ duplicate: true });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.selectedImage = file;

    // Preview the image
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  get formControls() {
    return this.registrationForm.controls;
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const studentData = this.registrationForm.value;

      this.commonApi.registerStudent(studentData).subscribe(
        (response) => {
          this.showSuccessMessage = true;
          this.registrationForm.reset();
          this.openSnackBar('Student registered successfully!', 'Close');

        },
        (error) => {
          this.openSnackBar('Student registered Fail!', 'Try Again');
          console.error('Error registering student:', error);
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
