import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password: string = control.value;
  if (!password) {
    return null;
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  const valid = hasLetter && hasNumber;

  return valid ? null : { invalidPassword: true };
}
