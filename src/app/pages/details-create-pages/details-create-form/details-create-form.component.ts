import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgClass } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Guide } from 'app/interfaces/guides';
import { ShowInfoComponent } from 'app/pages/details-create-pages/show-info/show-info.component';
import { TextareaFormComponent } from '../textarea-form/textarea-form.component';

@Component({
  selector: 'app-guide-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatChipsModule,
    GoogleMapsModule,
    NgClass,
    ShowInfoComponent,
    TextareaFormComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './details-create-form.component.html',
  styleUrl: './details-create-form.component.scss',
})
export class GuidePageComponent {
  transports: string[] = [
    'directions_bus',
    'subway',
    'tram',
    'directions_car',
    'local_taxi',
  ];
  @Input() isCreatePage!: boolean;
  @Input() seeResult?: boolean;
  @Input() btnHide?: boolean;
  @Input() isFavorite?: boolean;
  @Input() userName?: string;
  @Input() inside?: string;
  @Input() photoList!: string[];
  @Input() photoId!: number;
  @Input() newGuide?: Guide;
  @Input() guide?: Guide;
  @Input() userFavoriteGuides?: Guide[];
  @Input() nameForm?: FormGroup;
  @Input() uploadPhotoForm?: FormGroup;
  @Input() infoForm?: FormGroup;
  @Input() latitude?: AbstractControl | null;
  @Input() longitude?: AbstractControl | null;
  @Input() areatextForm?: FormGroup;
  @Input() latErrorText?: string;
  @Input() lngErrorText?: string;

  @Output() toggleFavoriteEvent = new EventEmitter<void>();
  @Output() toggleTransportEvent = new EventEmitter<Event>();
  @Output() changeClickEvent = new EventEmitter<void>();
  @Output() applyClickEvent = new EventEmitter<void>();
  @Output() createClickEvent = new EventEmitter<void>();
  @Output() uploadPhotoEvent = new EventEmitter<Event>();
  @Output() deletePhotoEvent = new EventEmitter<void>();
  @Output() nextPhotoEvent = new EventEmitter<void>();
  @Output() prevPhotoEvent = new EventEmitter<void>();
  @Output() addExtraSpaceEvent = new EventEmitter<void>();

  constructor() {}

  ngOnChanges(): void {
    this.latitude = this.infoForm?.get('latitude');
    this.longitude = this.infoForm?.get('longitude');
  }

  toggleFavorite() {
    this.toggleFavoriteEvent.emit();
  }

  toggleTransport(event: Event) {
    this.toggleTransportEvent.emit(event);
  }

  changeClick() {
    this.changeClickEvent.emit();
  }

  applyClick() {
    this.applyClickEvent.emit();
  }

  createClick() {
    this.createClickEvent.emit();
  }

  uploadPhoto(event: Event) {
    this.uploadPhotoEvent.emit(event);
  }

  deletePhoto() {
    this.deletePhotoEvent.emit();
  }

  nextPhoto() {
    this.nextPhotoEvent.emit();
  }

  prevPhoto() {
    this.prevPhotoEvent.emit();
  }

  addExtraSpace() {
    this.addExtraSpaceEvent.emit();
  }
 
}
