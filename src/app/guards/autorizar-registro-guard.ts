import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../services/user-service';

export const autorizarRegistroGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  let authorities = userService.geAuthoritiesActual();
    if (authorities) {
      if (authorities.indexOf("ASSIST")>=0 || authorities.indexOf("ADMIN")>=0) {
        return true;
      }
    }
  
  return false; 

};


 