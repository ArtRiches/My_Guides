import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { User } from 'app/interfaces/user';
import { AuthRegFormComponent } from 'app/pages/auth-reg-pages/auth-reg-form/auth-reg-form.component';
import { UserService } from 'app/services/user.service';

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

  constructor(private router: Router, private userService: UserService) {}

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClick(): void {

      const access = null;
      
        
        if (access != null) {
          this.email_error_text = 'A user with this email already exists';
          this.applyForm.controls.email.setErrors({ userFound: true });
        } else {
          const NEWUSER: User = {
            email: this.applyForm.controls.email.value || '',
            favoriteGuides: [],
            userGuides: [],
            role: ""
          };
          
          this.userService.addUser(NEWUSER).subscribe();
          this.router.navigate(['/auth']);
        }
  }
}
