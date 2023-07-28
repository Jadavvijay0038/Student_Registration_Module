import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { CommonApiService } from './Services/common-api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentListComponent } from './student-list/student-list.component';
import { EditStudentComponent } from './edit-student/edit-student.component';




@NgModule({
  declarations: [
    AppComponent,
    StudentRegistrationComponent,
    AdminLoginComponent,
    StudentListComponent,
    EditStudentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule, MatButtonModule, MatIconModule, FormsModule,ReactiveFormsModule, HttpClientModule, MatSnackBarModule
  ],
  providers: [CommonApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
