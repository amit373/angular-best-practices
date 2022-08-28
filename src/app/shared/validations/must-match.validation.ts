import { FormGroup, AbstractControl } from '@angular/forms';

export const MustMatch =
  (controlName: string, matchingControlName: string) =>
  (formGroup: FormGroup): void => {
    const control: AbstractControl = formGroup.controls[controlName];
    const matchingControl: AbstractControl =
      formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
