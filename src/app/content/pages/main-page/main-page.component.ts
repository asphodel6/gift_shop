import { Component } from '@angular/core';
import {BarComponent} from './components/bar/bar.component';
import {FooterComponent} from '../../../../../public';

@Component({
    selector: 'main-page',
  imports: [
    BarComponent,
    FooterComponent
  ],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.less'
})
export class MainPageComponent {

}
