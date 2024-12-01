import {inject, Injectable} from '@angular/core';
import {URL_TOKEN} from '../tokens/url.token';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ILogin, ILoginResponse, IRegistration} from '../interfaces/auth.interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private readonly url = inject(URL_TOKEN);
  private httpClient: HttpClient = inject(HttpClient);

  public login(data: ILogin): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(`${this.url}/auth/login`, data);
  }

  public registration(data: IRegistration): Observable<unknown> {
    return this.httpClient.post<unknown>(`${this.url}/auth/register`, data);
  }
}
