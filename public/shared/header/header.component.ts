import {Component, inject, OnInit} from '@angular/core';
import {TuiButton, TuiHint} from '@taiga-ui/core';
import {Router, RouterLink} from '@angular/router';
import {TokensService} from '../../../src/app/auth/service/tokens.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {AuthService} from '../../../src/app/auth/service/auth.service';
import {BarComponent} from './component/bar/bar.component';
import {StorageService} from '../storage-service/storage.service';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterLink,
    AsyncPipe,
    TuiButton,
    TuiHint,
    BarComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit {
  private readonly tokensService = inject(TokensService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly storageService = inject(StorageService);
  readonly isAuth = this.tokensService.isLoggedIn$;

  readonly cartCount = toSignal(this.storageService.cartCount$);

  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.tokensService.isTokenValid();
  }

  get showIcons(): boolean {
    return !(window.location.pathname === '/registration'
      || window.location.pathname === '/login');
  }

  goToCart(): void {
    this.router.navigate(['main/shopping-cart']);
  }
}
