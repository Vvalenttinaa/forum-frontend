import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const moderatorGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

    if(authService.getRole()=="moderator" || authService.getRole()=='admin'){
      console.log(authService.getRole());
      return true;
    }else
      return router.navigate(['/unauthorized']);
};