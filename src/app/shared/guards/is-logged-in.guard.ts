import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { SupabaseService } from '../../core/service/supabase.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IsLoggedInGuard implements CanActivate {
  constructor(private supabaseService: SupabaseService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.supabaseService.getUser()
      .pipe(
        map((user) => {
          console.log({user})
          if (user.error) {
            return this.router.createUrlTree(['auth', 'login']);
          } else {
            return true;
          }
        })
      )
  }

}
