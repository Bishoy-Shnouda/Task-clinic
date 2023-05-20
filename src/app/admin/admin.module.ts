import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './components/patient/patient.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { ClinicComponent } from './components/clinic/clinic.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { adminGuard } from './Guards/admin.guard';

const routes: Routes = [
  { path: 'patient', component: PatientComponent, canActivate: [adminGuard] },
  { path: 'doctor', component: DoctorComponent, canActivate: [adminGuard] },
  { path: 'clinic', component: ClinicComponent, canActivate: [adminGuard] },
  {
    path: 'appoientment',
    component: AppointmentComponent,
    canActivate: [adminGuard],
  },
];

@NgModule({
  declarations: [
    PatientComponent,
    DoctorComponent,
    ClinicComponent,
    AppointmentComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class AdminModule {}
