import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TuiRoot} from '@taiga-ui/core';
import {HeaderComponent} from '../../public';
import {DestroyService} from './services/destroy.service';

@Component({
  selector: 'app-root',
  imports: [TuiRoot, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  providers: [DestroyService]
})
export class AppComponent {
}
