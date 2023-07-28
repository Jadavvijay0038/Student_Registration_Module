import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonApiService } from '../Services/common-api.service';
import { STATES, CITIES } from '../StaticData';


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  updateForm: FormGroup;
  studentId: any;
  states = STATES;
  cities: { id: number; name: string; }[] = [];
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private commonApiService: CommonApiService) {
    this.updateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      profileImage: ['']
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.studentId = params.get('id');
      // Fetch the student data by ID from the API (assuming you have a getStudentById() method in your CommonApiService)
      this.commonApiService.getStudentById(this.studentId).subscribe(
        (student) => {
          this.updateForm.patchValue(student);
        },
        (error) => {
          console.error('Error fetching student data:', error);
        }
      );
    });

    this.updateForm.get('state').valueChanges.subscribe((selectedStateId) => {
      if (selectedStateId) {
        this.cities = CITIES[selectedStateId];
        this.updateForm.get('city').setValue('');
      } else {
        this.cities = [];
        this.updateForm.get('city').setValue('');
      }
    });
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

  get formControls() {
    return this.updateForm.controls;
  }

  onSubmit() {
    if (this.updateForm.valid) {
      const updatedStudentData = this.updateForm.value;
      // Call the updateStudent method from your CommonApiService and handle success/failure accordingly
      this.commonApiService.updateStudent(this.studentId, updatedStudentData).subscribe(
        (response) => {
          // Student updated successfully, navigate back to the student list page
          this.router.navigate(['/StudentList']);
        },
        (error) => {
          console.error('Error updating student:', error);
        }
      );
    }
  }
}
