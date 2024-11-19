import {Component, inject} from '@angular/core';
import {
  TuiButton,
  TuiIcon,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
} from '@taiga-ui/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TuiPassword} from '@taiga-ui/kit';
import {RouterLink} from '@angular/router';

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
    TuiButton,
    RouterLink,
    ReactiveFormsModule
  ],
  providers: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(7)]]
  });

  onSubmit(): void {
    console.log(this.loginForm.value);
  }
}