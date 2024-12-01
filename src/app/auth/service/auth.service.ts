import {inject, Injectable} from '@angular/core';
import {ILogin, IRegistration} from '../interfaces/auth.interfaces';
import {AuthApiService} from './auth-api.service';
import {catchError, first, Observable, of, tap} from 'rxjs';
import {TuiAlertService} from '@taiga-ui/core';
import {Router} from '@angular/router';
import {TokensService} from './tokens.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authApiService = inject(AuthApiService);
  private readonly alerts = inject(TuiAlertService);
  private readonly router = inject(Router);
  private readonly tokensService = inject(TokensService);

  public login(data: ILogin): void {
    this.authApiService.login(data).pipe(
      first(),
      tap(() => {
          this.alerts.open('Вы успешно авторизовались', {appearance: 'positive'}).pipe(
            first()
          ).subscribe()

          // this.router.navigate(['registration']);
        }
      ),
      catchError(() => {
          this.alerts.open('Неверный email или пароль', {appearance: 'negative'}).pipe(
            first()
          ).subscribe()

          return of(null);
        }
      )
    ).subscribe(response => {
      if (response) {
        this.tokensService.setAccessToken(response);
      }
    });
  }

  public registration(data: IRegistration): void {
    this.authApiService.registration(data).pipe(
      first(),
      tap(() => {
          this.alerts.open('Вы успешно зарегистрировались', {appearance: 'positive'}).pipe(
            first()
          ).subscribe()

          this.router.navigate(['login']);
        }
      ),
      catchError(() => {
        this.alerts.open('Пользователь с таким email уже существует', {appearance: 'warning'}).pipe(
          first()
        ).subscribe()

        return of(null);
      })
    ).subscribe();
  }

  public logout(): void {
    this.tokensService.clearTokens();
  }
}
