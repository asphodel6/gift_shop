import {inject, Injectable} from '@angular/core';
import {URL_TOKEN} from '../tokens/url.token';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ILogin, IRegistration} from '../interfaces/auth.interfaces';
import {catchError, first, Observable, of} from 'rxjs';
import {TuiAlertService} from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly url = inject(URL_TOKEN);
  private httpClient: HttpClient = inject(HttpClient);
  private jwt: JwtHelperService = inject(JwtHelperService);
  private readonly alerts = inject(TuiAlertService);

  public login(data: ILogin): Observable<unknown> {
    return this.httpClient.post<unknown>(`${this.url}/auth/login`, data).pipe(
        catchError(() => {
           this.alerts.open('Неверный email или пароль', {appearance: 'negative'}).pipe(
             first()
           ).subscribe()

           return of(null);
        })
    );
  }

  public registration(data: IRegistration): Observable<unknown> {
    return this.httpClient.post<unknown>(`${this.url}/auth/register`, data).pipe(
      catchError(() => {
        this.alerts.open('Пользователь с таким email уже существует', {appearance: 'warning'}).pipe(
          first()
        ).subscribe()

        return of(null);
      })
    );
  }
}
