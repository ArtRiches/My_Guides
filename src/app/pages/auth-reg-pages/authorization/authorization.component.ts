import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AuthRepository } from 'app/stores/user-repository';
import { UsersList } from 'app/interfaces/users';
import { AuthRegFormComponent } from 'app/pages/auth-reg-pages/auth-reg-form/auth-reg-form.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [AuthRegFormComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent {
  hidden: boolean = true;
  token?: Observable<string>;

  applyForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authRepository: AuthRepository) {}

  onClick(): void {
    const access = UsersList.find(
      (user) =>
        user.email === this.applyForm.controls.email.value &&
        user.password === this.applyForm.controls.password.value
    );

    if (access != null) {
      this.generateToken();
      this.authRepository.updateUser({ id: access });
      this.router.navigate(['/']);
    }
  }

  generateToken(): void {
    this.token = of(String(Math.random()));
  }
}
