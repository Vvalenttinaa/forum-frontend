import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

    if(authService.getRole()=="admin"){
      console.log('izvrsi se admin');
      console.log(authService.getRole());
      return true;
    }else  
      return router.navigate(['/unauthorized']);
};
