import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Appointment } from '../../Interfaces/appointment';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent {
  timeOptions: string[] = [];
  appointmentForm!: FormGroup;
  /*roleId: Role = Role.doctor;*/
  appointments: any[] = [];
  date: any;
  type: any;
  time: any;

  appointment!: Appointment;
  constructor(private service: AdminService) {
    this.generateTimeOptions();
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  generateTimeOptions() {
    const startTime = 13; // 01:00 PM
    const endTime = 20; // 08:00 PM

    for (let hour = startTime; hour <= endTime; hour++) {
      const time = hour < 10 ? `0${hour}:00 PM` : `${hour}:00 PM`;
      this.timeOptions.push(time);
    }
  }

  getAppointments() {
    this.service.getAppoientment().subscribe((res: any) => {
      this.appointments = res;
    });
  }

  deleteAppointment(id: number) {
    this.service.deleteAppoientment(id).subscribe(
      (next) => {
        this.ngOnInit();
      },
      (err) => {}
    );
  }

  newAppointment() {
    debugger;
    let obj = {
      type: this.type,
      date: this.date,
      time: this.time,
    };
    this.service.addAppoientment(obj).subscribe(
      (next) => {
        this.ngOnInit();
        this.type = '';
        this.date = '';
        this.time = '';
      },
      (err) => {}
    );
  }

  editValue(item: any) {
    this.appointment = item;
  }

  editClinic() {
    this.service.updateClinic(this.appointment).subscribe(
      (next) => {
        this.ngOnInit();
      },
      (err) => {}
    );
  }
}
