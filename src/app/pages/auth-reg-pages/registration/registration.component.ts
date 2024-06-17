import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Users, UsersList } from 'app/interfaces/users';
import { AuthRegFormComponent } from 'app/pages/auth-reg-pages/auth-reg-form/auth-reg-form.component';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [AuthRegFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent {
  hidden: boolean = true;
  email_error_text: string = 'Email is required.';

  applyForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    ]),
  });

  subscription = new Subscription();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscription.add(
      this.applyForm.controls.email.valueChanges.subscribe((email) => {
        if (email == '') {
          this.email_error_text = 'Email is required.';
          this.applyForm.updateValueAndValidity();
        }
      })
    );
  }

  onClick(): void {
    const access = UsersList.find(
      (user) => user.email === this.applyForm.controls.email.value
    );

    if (access != null) {
      this.email_error_text = 'A user with this email already exists';
      this.applyForm.controls.email.setErrors({ userFound: true });
    } else {
      const NEWUSER: Users = {
        email: this.applyForm.controls.email.value!,
        password: this.applyForm.controls.password.value!,
        favoriteGuides: [],
        userGuides: [],
      };
      UsersList.push(NEWUSER);
      this.router.navigate(['/auth']);
    }
  }
}
