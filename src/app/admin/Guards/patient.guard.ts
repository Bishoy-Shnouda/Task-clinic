import { CanActivateFn } from '@angular/router';
import { Role } from 'src/app/auth/enums/roles';

export const patientGuard: CanActivateFn = (route, state) => {
  if ((localStorage.getItem('roleId') as unknown as number) == Role.patient)
    return true;
  else return false;
};
