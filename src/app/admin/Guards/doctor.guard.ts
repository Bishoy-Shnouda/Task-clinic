import { CanActivateFn } from '@angular/router';
import { Role } from 'src/app/auth/enums/roles';

export const doctorGuard: CanActivateFn = (route, state) => {
  if ((localStorage.getItem('roleId') as unknown as number) == Role.doctor)
    return true;
  else return false;
};
