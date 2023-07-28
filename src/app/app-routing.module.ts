import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { StudentListComponent } from './student-list/student-list.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'registration', component: StudentRegistrationComponent },
  { path: 'edit-student/:id', component: EditStudentComponent }, // Add the route for the EditStudentComponent
  { path: 'StudentList', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
