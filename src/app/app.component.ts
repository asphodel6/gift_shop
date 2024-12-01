import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TuiRoot} from '@taiga-ui/core';
import {HeaderComponent} from '../../public';

@Component({
    selector: 'app-root',
    imports: [TuiRoot, RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.less'
})
export class AppComponent {
}
