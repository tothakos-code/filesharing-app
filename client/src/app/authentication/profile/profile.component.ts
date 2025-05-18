import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  firstName!: string | undefined;
  lastName!: string  | undefined;
  email!: string | undefined;
  role!: string | undefined;

  constructor(private authService: AuthenticationService, private location: Location) { }

  ngOnInit(): void {
    this.firstName = this.authService.getFirstName();
    this.lastName = this.authService.getLastName();
    this.role = this.authService.getRole();
    this.email = this.authService.getEmail();

  }
  goBack(): void {
    this.location.back(); // This will navigate back to the previous page in history
  }

}
