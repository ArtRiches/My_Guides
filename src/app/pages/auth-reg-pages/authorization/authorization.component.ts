import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserRepository } from 'app/repo/user.repo';
import { AuthRegFormComponent } from 'app/pages/auth-reg-pages/auth-reg-form/auth-reg-form.component';
import { JWTRepository } from 'app/repo/jwt.repo';

import { AuthService } from 'app/services/auth.service';

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
  csrf?: string;

  applyForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private userRepo: UserRepository,
    private jwtRepo: JWTRepository,
    private authService: AuthService,
  ) {}

  onClick(): void {
    this.authService
      .login(
        this.applyForm.controls.email.value || '',
        this.applyForm.controls.password.value || ''
      )
      .subscribe((response: string) => {
        if (response != null) {
          this.jwtRepo.add(response);
          this.userRepo.add(this.applyForm.controls.email.value!);
          this.router.navigate(['/guides']);
        } else {
          console.log('user not found');
        }
      });
  }
}
