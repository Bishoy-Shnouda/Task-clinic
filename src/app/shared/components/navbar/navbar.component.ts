import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private service: AuthService) {}
  isLoged!: boolean;
  isAdmin!: boolean;
  isDoctor!: boolean;
  isPatient!: boolean;
  ngOnInit(): void {
    this.service.isLoged.subscribe((res) => {
      this.isLoged = res;
    });
    this.service.isAdmin.subscribe((res) => {
      this.isAdmin = res;
    });
    this.service.isDoctor.subscribe((res) => {
      this.isDoctor = res;
    });
    this.service.isPatient.subscribe((res) => {
      this.isPatient = res;
    });
  }

  logout() {
    this.service.logOut();
  }
}
