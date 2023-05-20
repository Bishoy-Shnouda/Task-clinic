import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  userForm!: FormGroup;
  patients: any[] = [];
  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.getdusers();
  }

  createForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  getdusers() {
    this.service.getUsers(3).subscribe((res: any) => {
      this.patients = res;
    });
  }
  submit() {
    debugger;
    const model = {
      username: this.userForm.value.username,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      roleId: 3,
    };

    let user = this.patients.find(
      (item) => item.email == this.userForm.value.email
    );
    if (user != null) {
      this.toaster.error('This email already exists ...', '', {
        disableTimeOut: false,
        titleClass: 'toastr_title',
        messageClass: 'toastr_message',
        timeOut: 5000,
        closeButton: true,
      });
    } else {
      this.service.createUser(model).subscribe((res: any) => {
        this.toaster.success('Account successfully created ...', '', {
          disableTimeOut: false,
          titleClass: 'toastr_title',
          messageClass: 'toastr_message',
          timeOut: 5000,
          closeButton: true,
        });
      });
    }
  }
}
