import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {TokensService} from '../../auth/service/tokens.service';
import {map} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const tokensService = inject(TokensService);
  const router = inject(Router);

  tokensService.isTokenValid();

  return tokensService.isLoggedIn$.pipe(
    map(isValid => {
      if (!isValid) {
        router.navigate(['/dashboard/partners']);
      }

      return isValid;
    })
  );
};
