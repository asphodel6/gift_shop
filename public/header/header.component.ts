import {Component, inject} from '@angular/core';
import {TuiIcon} from '@taiga-ui/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {TokensService} from '../../src/app/auth/service/tokens.service';

@Component({
  selector: 'main-header',
  standalone: true,
  imports: [
    TuiIcon,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  private readonly tokensService = inject(TokensService);
  readonly isAuth = this.tokensService.isLoggedIn$;
}
