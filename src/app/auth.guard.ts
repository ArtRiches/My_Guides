import { inject, Injectable } from '@angular/core';
import { Router, CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JWTRepository } from './repo/jwt.repo';

@Injectable({
  providedIn: 'root',
})
export class authGuard {
  constructor(private router: Router, private jwtRepo: JWTRepository) {}

  canActivate(): boolean {
    if (this.jwtRepo.isAuth()) {
      return true;
    }
    this.router.navigate(['/auth']);
    return false;
  }
  
}

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot,  state: RouterStateSnapshot) => {
  return inject(authGuard).canActivate();
};
