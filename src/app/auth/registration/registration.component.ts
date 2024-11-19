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
import {
  TuiInputDateModule, TuiTextfieldControllerModule
} from '@taiga-ui/legacy';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'registration',
  standalone: true,
  imports: [
    TuiTextfieldComponent,
    FormsModule,
    TuiIcon,
    TuiLabel,
    TuiTextfieldDirective,
    TuiPassword,
    TuiButton,
    TuiInputDateModule,
    RouterLink,
    ReactiveFormsModule,
    TuiTextfieldControllerModule
  ],
  providers: [],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.less'
})
export class RegistrationComponent {
  private fb = inject(FormBuilder);

  registrationForm: FormGroup = this.fb.group({
    secondName: ['', [Validators.required]],
    firstName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    dateOfBirth: [null, [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(7)]],
  });

  onSubmit(): void {
    console.log(this.registrationForm.value);
  }
}
