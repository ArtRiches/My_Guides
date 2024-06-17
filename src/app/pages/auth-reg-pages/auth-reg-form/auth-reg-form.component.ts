import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
  AbstractControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-reg-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './auth-reg-form.component.html',
  styleUrl: './auth-reg-form.component.scss',
})
export class AuthRegFormComponent {
  @Input() hidden?: boolean;
  @Input() isAuth?: boolean;
  @Input() header_text?: string;
  @Input() text_under_header?: string;
  @Input() email_error_text?: string;
  @Input() button_text?: string;

  @Input() applyForm?: FormGroup;
  email?: AbstractControl | null;
  password?: AbstractControl | null;

  @Output() onBtnClick = new EventEmitter<void>();

  ngOnChanges(): void {
    this.email = this.applyForm?.get('email');
    this.password = this.applyForm?.get('password');
  }

  onClick(): void {
    this.onBtnClick.emit();
  }

  emailCheck(): boolean | undefined {
    return this.email?.invalid;
  }
}
