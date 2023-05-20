import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  users: any[] = [];
  role: number = 2;
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {
    this.service.isLoged.subscribe((res) => {
      if (res) {
        this.router.navigate(['/myHealth/doctor']);
      }
    });
  }

  ngOnInit(): void {
    this.getUsers();
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  getRole(event: any) {
    this.role = event.value;
    this.getUsers();
  }
  getUsers() {
    this.service.getUsers(this.role).subscribe((res: any) => {
      this.users = res;
    });
  }

  submit() {
    this.getUsers();
    let user = this.users.find(
      (item) =>
        item.email == this.loginForm.value.email &&
        item.password == this.loginForm.value.password
    );
    if (user == null)
      this.toaster.error('The email or password is incorrect ...', '', {
        disableTimeOut: false,
        titleClass: 'toastr_title',
        messageClass: 'toastr_message',
        timeOut: 5000,
        closeButton: true,
      });
    else {
      this.toaster.success('Logged in successfully ...', '', {
        disableTimeOut: false,
        titleClass: 'toastr_title',
        messageClass: 'toastr_message',
        timeOut: 5000,
        closeButton: true,
      });
      this.service.isLoged.next(true);
      localStorage.setItem('isLoged', 'true');
      localStorage.setItem('roleId', user.roleId);

      switch (user.roleId) {
        case 1:
          this.service.isAdmin.next(true);
          this.service.isDoctor.next(false);
          this.service.isPatient.next(false);
          localStorage.setItem('isAdmin', 'true');
          localStorage.setItem('isDoctor', 'false');
          localStorage.setItem('isPatient', 'false');

          this.router.navigate(['/myHealth/doctor']);
          break;
        case 2:
          this.service.isAdmin.next(false);
          this.service.isDoctor.next(true);
          this.service.isPatient.next(false);
          localStorage.setItem('isAdmin', 'false');
          localStorage.setItem('isDoctor', 'true');
          localStorage.setItem('isPatient', 'false');

          this.router.navigate(['/doctor']);
          break;
        case 3:
          this.service.isAdmin.next(false);
          this.service.isDoctor.next(false);
          this.service.isPatient.next(true);
          localStorage.setItem('isAdmin', 'false');
          localStorage.setItem('isDoctor', 'false');
          localStorage.setItem('isPatient', 'true');

          this.router.navigate(['/patient']);
          break;
        default:
          this.service.isAdmin.next(false);
          this.service.isDoctor.next(false);
          this.service.isPatient.next(false);
          this.router.navigate(['/error']);
          break;
      }
    }
  }
}
