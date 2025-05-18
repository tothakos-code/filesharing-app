import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserManagerService } from 'src/app/services/user-manager.service';
import {Location} from "@angular/common";

@Component({
  selector: 'user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  public users: User[] | undefined;

  constructor(
    private userManager: UserManagerService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userManager.getUsers().subscribe({
      next: users => { this.users = users; }
    });
  }

  public setRole(user: User, role: string) {
    this.userManager.updateUser(user._id, { role: role }).subscribe({
      next: () => { this.loadUsers(); }
    })
  }

  public deleteUser(user: User) {
    this.userManager.deleteUser(user._id).subscribe({
      next: () => { this.loadUsers(); }
    })
  }

  goBack(): void {
    this.location.back(); // This will navigate back to the previous page in history
  }

}
