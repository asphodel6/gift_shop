import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from "../../../public";

@Component({
    selector: 'main',
    imports: [
        RouterOutlet,
        FooterComponent,
    ],
    templateUrl: './main.component.html',
    styleUrl: './main.component.less'
})
export class MainComponent {

}
