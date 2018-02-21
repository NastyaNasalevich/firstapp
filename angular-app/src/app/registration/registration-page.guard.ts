import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {SecurityService} from "../auth/security.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class RegistrationPageGuard implements CanActivate {
  constructor(private securityService: SecurityService, private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.securityService.isLoggedIn()) {
      this.router.navigate(['/users']);
      return false;
    }
    return true;
  }
}
