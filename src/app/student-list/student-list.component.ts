import { Component, OnInit } from '@angular/core';
import { CommonApiService } from '../Services/common-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: any[] = []; // Array to store the list of students
  filteredStudents: any[] = []; // Array to store filtered students
  searchQuery: string = ''; 

  constructor(
    private commonApiService: CommonApiService,
    private router: Router
  ) { }

  ngOnInit() {
    // Fetch the list of students from the API (assuming you have a getStudents() method in your CommonApiService)
    this.commonApiService.getStudents().subscribe(
      (response) => {
        this.students = response; // Assuming the API returns an array of student objects
        this.filteredStudents = this.students; // Initialize filteredStudents with all students initially
      },
      (error) => {
        console.error('Error fetching student data:', error);
      }
    );
  }

  // Function to filter students based on search query
  search() {
    this.filteredStudents = this.students.filter((student) => {
      const values = Object.values(student).map(value => value.toString().toLowerCase());
      return values.some((value) => value.includes(this.searchQuery.toLowerCase()));
    });
  }

  // Function to edit a student
  editStudent(student: any) {
    // Navigate to the edit page, passing the student ID as a route parameter
    this.router.navigate(['/edit-student', student._id]); // Replace '/edit-student' with the actual edit page route
  }

  //Function to delete a student
  deleteStudent(student: any) {
    // Call the deleteStudent method from your CommonApiService and handle success/failure accordingly
    this.commonApiService.deleteStudent(student._id).subscribe(
      (response) => {
        // Student deleted successfully, refresh the list
        this.students = this.students.filter((s) => s._id !== student._id);
        this.filteredStudents = this.filteredStudents.filter((s) => s._id !== student._id);
      },
      (error) => {
        console.error('Error deleting student:', error);
      }
    );
  }
}
