import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, } from 'rxjs';
import { map } from 'rxjs/operators';


export interface LoginCredentials {
  emailOrMobile: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  isloggin:boolean = false
  isLoggedIn() {
    return this.isloggin;
  }

  private apiUrl = 'http://localhost:3910';

  constructor(private http: HttpClient) { }
  
  login(credentials: LoginCredentials): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials)
      .pipe(map((response: { message: string; }) => {
          if (response && response.message === 'Login successful') {
            return true;
          } else {
            return false;
          }
        })
      );
  }

  checkDuplicateEntry(field: string, value: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/checkDuplicate`, { field, value });
  }

  registerStudent(studentData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registerStudent`, studentData);
  }

  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/students`);
  }

  deleteStudent(studentId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/students/${studentId}`);
  }

  getStudentById(studentId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/students/${studentId}`);
  }

  updateStudent(studentId: any, updatedStudentData: any) {
    return this.http.patch<any>(`${this.apiUrl}/students/${studentId}`, updatedStudentData);
  }
}
