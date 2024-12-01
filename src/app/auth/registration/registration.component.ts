import {Component, inject} from '@angular/core';
import {
  TuiButton, TuiError,
  TuiIcon,
  TuiLabel,
  TuiTextfieldComponent,
  TuiTextfieldDirective,
} from '@taiga-ui/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {TuiFieldErrorPipe, TuiPassword} from '@taiga-ui/kit';
import {
  TuiInputDateModule, TuiTextfieldControllerModule
} from '@taiga-ui/legacy';
import {RouterLink} from '@angular/router';
import {AuthApiService} from '../service/auth-api.service';
import {TuiDay, TuiValidationError} from '@taiga-ui/cdk';
import {AsyncPipe} from '@angular/common';
import {IRegistration} from '../interfaces/auth.interfaces';
import {first} from 'rxjs';
import {AuthService} from '../service/auth.service';

@Component({
    selector: 'registration',
    imports: [
        TuiTextfieldComponent,
        FormsModule,
        TuiLabel,
        TuiTextfieldDirective,
        TuiButton,
        TuiInputDateModule,
        RouterLink,
        ReactiveFormsModule,
        TuiTextfieldControllerModule,
        TuiError,
        TuiFieldErrorPipe,
        AsyncPipe
    ],
    providers: [],
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.less'
})
export class RegistrationComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  registrationForm: FormGroup = this.fb.group({
    lastname: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    birthday: [null, [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(7)]],
    confirmPassword: ['', [Validators.required]],
  }, {
    validators: [this.confirmPasswordValidator]
  });

  onSubmit(): void {
    const data: IRegistration = this.registrationForm.value;

    data.birthday = (data.birthday as unknown as TuiDay).toString();

    this.authService.registration(data);
  }

  confirmPasswordValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return new TuiValidationError('Пароли должны совпадать');
    }

    return null;
  }
}
