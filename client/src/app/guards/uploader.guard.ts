import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UploaderGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
  }

  canActivate(): Promise<boolean> | boolean {
    if (this.authenticationService.getIsAuthenticated()
      && (this.authenticationService.getRole() === "admin"
        || this.authenticationService.getRole() === "uploader")) {
      return true;
    } else {
      return this.router.navigateByUrl('/login');
    }
  }

}
