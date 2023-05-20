import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  apiUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  /* doctor */
  addDoctor(model: any) {
    return this.http.post(this.apiUrl + 'user', model);
  }

  getDoctors() {
    return this.http.get(this.apiUrl + 'user?roleId=2');
  }

  updateDoctor(model: any) {
    return this.http.put(this.apiUrl + 'user/' + model.id, model);
  }

  deleteDoctor(id: number) {
    return this.http.delete(this.apiUrl + 'user/' + id);
  }

  /* Clinic */
  addClinic(model: any) {
    return this.http.post(this.apiUrl + 'clinic', model);
  }

  getClinic() {
    return this.http.get(this.apiUrl + 'clinic');
  }

  updateClinic(model: any) {
    return this.http.put(this.apiUrl + 'clinic/' + model.id, model);
  }

  deleteClinic(id: number) {
    return this.http.delete(this.apiUrl + 'clinic/' + id);
  }

  addAppoientment(model: any) {
    return this.http.post(this.apiUrl + 'appoientment', model);
  }

  getAppoientment() {
    return this.http.get(this.apiUrl + 'appoientment');
  }

  updateAppoientment(model: any) {
    return this.http.put(this.apiUrl + 'appoientment/' + model.id, model);
  }

  deleteAppoientment(id: number) {
    return this.http.delete(this.apiUrl + 'appoientment/' + id);
  }
}
