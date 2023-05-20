import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../../services/admin.service';
import { Doctor } from '../../Interfaces/doctor';
import { Role } from 'src/app/auth/enums/roles';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
})
export class DoctorComponent {
  userForm!: FormGroup;
  /*roleId: Role = Role.doctor;*/
  doctors: any[] = [];
  doctorName: any;
  doctorEmail: any;
  doctorPassword: any;

  doctor!: Doctor;

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.getdoctors();
  }

  getdoctors() {
    debugger;
    this.service.getDoctors().subscribe((res: any) => {
      this.doctors = res;
    });
  }

  deleteDoctor(id: number) {
    this.service.deleteDoctor(id).subscribe(
      (next) => {
        this.ngOnInit();
      },
      (err) => {}
    );
  }

  newDoctor() {
    let obj = {
      username: this.doctorName,
      email: this.doctorEmail,
      password: this.doctorPassword,
      roleId: Role.doctor,
    };
    this.service.addDoctor(obj).subscribe(
      (next) => {
        this.ngOnInit();
        this.doctorEmail = '';
        this.doctorName = '';
        this.doctorPassword = '';
      },
      (err) => {}
    );
  }
  editValue(item: any) {
    this.doctor = item;
  }
  editDoctor() {
    this.service.updateDoctor(this.doctor).subscribe(
      (next) => {
        this.ngOnInit();
      },
      (err) => {}
    );
  }
}
