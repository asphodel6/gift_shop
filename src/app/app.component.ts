import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TuiRoot} from '@taiga-ui/core';
import {URL_TOKEN} from './auth/tokens/url.token';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TuiRoot, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
}
