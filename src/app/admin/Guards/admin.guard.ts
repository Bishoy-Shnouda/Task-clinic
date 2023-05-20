import { CanActivateFn } from '@angular/router';
import { Role } from 'src/app/auth/enums/roles';

export const adminGuard: CanActivateFn = (route, state) => {
  if ((localStorage.getItem('roleId') as unknown as number) == Role.admin)
    return true;
  else return false;
};
