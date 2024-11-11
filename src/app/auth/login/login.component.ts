import {Component} from '@angular/core';
import {
  TuiButton,
  TuiIcon,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
} from '@taiga-ui/core';
import {FormsModule} from '@angular/forms';
import {TuiPassword} from '@taiga-ui/kit';

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    TuiTextfieldComponent,
    FormsModule,
    TuiIcon,
    TuiLabel,
    TuiTextfieldDirective,
    TuiPassword,
    TuiButton
  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  protected value = '';
}
