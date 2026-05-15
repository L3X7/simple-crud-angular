import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static match(controlName: string, matchingControlName: string): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const control = group.get(controlName);
      const matchingControl = group.get(matchingControlName);

      //If controls aren't found, return null
      if (!control || !matchingControl) {
        return null;
      }

      // If values match, clear the error on the matching control
      if (control.value === matchingControl.value) {
        if (matchingControl.hasError('mismatch')) {
          delete matchingControl.errors?.['mismatch'];
          matchingControl.updateValueAndValidity({ emitEvent: false });
        }
        return null;
      }

      // If they don't match, set the error on the second control
      matchingControl.setErrors({ mismatch: true });
      return { mismatch: true };
    };
  }
}
