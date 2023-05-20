import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Role } from 'src/app/auth/enums/roles';
import { AdminService } from '../../services/admin.service';
import { Clinic } from '../../Interfaces/clinic';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss'],
})
export class ClinicComponent {
  clinicForm!: FormGroup;
  /*roleId: Role = Role.doctor;*/
  clinics: any[] = [];
  clinicName: any;
  clinicAddress: any;

  clinic!: Clinic;

  constructor(private service: AdminService) {}

  ngOnInit(): void {
    this.getClinics();
  }

  getClinics() {
    this.service.getClinic().subscribe((res: any) => {
      this.clinics = res;
    });
  }

  deleteClinic(id: number) {
    this.service.deleteClinic(id).subscribe(
      (next) => {
        this.ngOnInit();
      },
      (err) => {}
    );
  }

  newClinic() {
    let obj = {
      name: this.clinicName,
      address: this.clinicAddress,
    };
    this.service.addClinic(obj).subscribe(
      (next) => {
        this.ngOnInit();
        this.clinicName = '';
        this.clinicName = '';
      },
      (err) => {}
    );
  }

  editValue(item: any) {
    this.clinic = item;
  }

  editClinic() {
    this.service.updateClinic(this.clinic).subscribe(
      (next) => {
        this.ngOnInit();
      },
      (err) => {}
    );
  }
}
