import { NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from "@angular/forms";
import { AppStropher } from "@appstrophe-workspace/auth/domain";
import { diffrentEntryConfirmValidator } from "../../validators/entry-confirm-validators";

@Component({
  selector: 'apps-user-settings-email',
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase, ReactiveFormsModule],
  template: `
    <form data-cy="user-email" class="user_email__container" [formGroup]="emailForm" (ngSubmit)="changeEmailRequest.emit(emailForm.controls['email']?.value)">
      <h2>Your email address</h2>
      <div class="form-group warning">
        <input data-cy="input-email" type="email" class="form-group__control" formControlName="email" id="email"
          aria-errormessage="emailError" placeholder="Enter your email" [attr.aria-invalid]="emailForm.controls['email'].invalid">
        <small id="emailError" class="form-group__error" [ngSwitch]="emailError">
          <span *ngSwitchCase="'required'">This field is required</span>
          <span *ngSwitchCase="'email'">This is not a valid email address</span>
        </small>
      </div>
      <button [disabled]="emailForm.invalid" type="submit" class="btn outlined warning">Change your email</button>
    </form>
  `,
  styles: [`
    form.user_email__container {
      @apply flex flex-col items-stretch
    }

    form.user_email__container > h2 {
      @apply text-yellow-600 font-bold pb-1 border-b border-zinc-300 dark:border-zinc-700
    }
  `]
})
export class UserProfileEmailComponent implements OnChanges {

  @Input() user: AppStropher;
  @Output() changeEmailRequest = new EventEmitter<string>();

  readonly emailForm: FormGroup;

  constructor() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
      const user = changes['user'].currentValue;
      if(user && this.emailForm.get('email')?.value !== user.email) {
        this.emailForm.get('email').patchValue(user.email);
        this.emailForm.get('email').addValidators([diffrentEntryConfirmValidator(user?.email)]);
      }
  }

  get emailError() {
    const email = this.emailForm.get('email');
    return email.touched && email.errors && Object.keys(email.errors)[0]
  }
}
