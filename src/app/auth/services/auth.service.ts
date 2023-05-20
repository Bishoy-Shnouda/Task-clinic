import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000/';
  isLoged: BehaviorSubject<boolean>;
  isAdmin: BehaviorSubject<boolean>;
  isDoctor: BehaviorSubject<boolean>;
  isPatient: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.isLoged = new BehaviorSubject<boolean>(
      Boolean(localStorage.getItem('isLoged'))
    );
    this.isAdmin = new BehaviorSubject<boolean>(
      Boolean(localStorage.getItem('isAdmin'))
    );
    this.isDoctor = new BehaviorSubject<boolean>(
      Boolean(localStorage.getItem('isDoctor'))
    );
    this.isPatient = new BehaviorSubject<boolean>(
      Boolean(localStorage.getItem('isPatient'))
    );
  }
  user = new Subject();

  createUser(model: any) {
    return this.http.post(this.apiUrl + 'user', model);
  }
  getUsers(roleId: number) {
    return this.http.get(this.apiUrl + 'user');
  }

  login(model: any) {
    return this.http.put(this.apiUrl + 'login', model);
  }

  getRole() {
    return this.http.get(this.apiUrl + 'login');
  }

  logOut() {
    localStorage.clear();
    this.isLoged.next(false);
    this.isAdmin.next(false);
    this.isDoctor.next(false);
    this.isPatient.next(false);
    this.router.navigate(['/login']);
  }
}
