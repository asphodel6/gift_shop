import {inject, Injectable} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ILoginResponse} from '../interfaces/auth.interfaces';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokensService {
  private jwt: JwtHelperService = inject(JwtHelperService);
  readonly isLoggedIn$ = new BehaviorSubject<boolean>(false);

  setAccessToken(data: ILoginResponse): void {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);

    this.isTokenValid();
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem('access_token');

    const isValid = !!token && !this.jwt.isTokenExpired(token);

    this.isLoggedIn$.next(isValid)

    return isValid;
  }

  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    this.isTokenValid();
  }
}
