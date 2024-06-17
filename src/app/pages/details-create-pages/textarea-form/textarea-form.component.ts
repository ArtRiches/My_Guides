import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-textarea-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './textarea-form.component.html',
  styleUrl: './textarea-form.component.scss',
})
export class TextareaFormComponent {
  @Input() isCreatePage!: boolean;
  @Input() seeResult?: boolean;
  @Input() titleName?: string;
  @Input() guideText?: string;
  @Input() newGuideText?: string;
  @Input() textForm?: FormGroup;

  constructor() {}
  formControlName: string = '';
  ngOnChanges() {
    if (this.titleName) {
      this.formControlName = this.titleName?.split(' ')[0];
    }
  }
}
